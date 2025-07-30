// app/api/clerk-webhook/route.ts
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhook } from '@clerk/nextjs/webhooks';

const prisma = new PrismaClient();


export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, first_name, last_name } = evt.data;

      try {
        await prisma.vendor.create({
          data: {
            clerkUserId: id,
            name: first_name || '',
            lastname: last_name || '',
            location: '',
            description: '',
            sales: 0,
            rating: 0,
          },
        });
      } catch (error) {
        console.error("Error creating vendor:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }
    }
    return new Response('Success', { status: 200 });
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return new Response('Webhook verification failed', { status: 400 });
  }
}
