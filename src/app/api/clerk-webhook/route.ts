// app/api/clerk-webhook/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }

    // Get the headers
    const headerPayload = await headers();

    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error occured -- no svix headers', {
        status: 400
      });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return new Response('Error occured', {
        status: 400
      });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, first_name, last_name, email_addresses, image_url } = evt.data;

      if (!id) {
        console.error("Webhook Error: Received user.created event without an ID.");
        return new Response('Error: Missing user ID', { status: 400 });
      }

      try {
        await prisma.vendor.upsert({
          where: { clerkUserId: id },
          update: {
            name: first_name || '',
            lastname: last_name || '',
          },
          create: {
            id: uuid(),
            clerkUserId: id,
            profilePic: image_url || '',
            email: email_addresses[0].email_address || '',
            name: first_name || '',
            lastname: last_name || '',
            location: '',
            description: '',
            sales: 0,
            rating: 0,
          },
        });
      } catch (error) {
        console.error("Error creating/updating vendor:", error);
        return NextResponse.json({ error: "Database error during vendor upsert" }, { status: 500 });
      }
    }
    return new Response('', { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook Error:', errorMessage);
    return new Response(`Webhook Error: ${errorMessage}`, { status: 500 });
  }
}
