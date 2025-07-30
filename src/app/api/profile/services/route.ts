import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const clerkUserId = searchParams.get('clerkUserId');

  if (!clerkUserId) {
    return NextResponse.json(
      { message: 'clerkUserId query parameter is required' },
      { status: 400 }
    );
  }

  try {
    const services = await prisma.service.findMany({
      where: {
        vendor: {
          clerkUserId: clerkUserId,
        },
      },
      include: {
        vendor: true,
      },
    });
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: (error as Error).message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
