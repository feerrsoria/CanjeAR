// src/app/api/products/route.ts

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'; // Import NextResponse for API responses

const prisma = new PrismaClient();

// Handle GET requests for /api/products
export async function GET(request: Request) {
  try {
    const products = await prisma.product.findMany({
      include: {
        vendor: true, // Optionally include vendor details
      },
      orderBy: {
        id: 'asc', // Or any other ordering you prefer
      },
    });

    // Return the products as a JSON response
    return NextResponse.json(products, { status: 200 });

  } catch (error) {
    console.error('Error fetching products:', error);
    // Return an error response
    return NextResponse.json(
      { message: 'Internal Server Error', error: (error as Error).message },
      { status: 500 }
    );
  } finally {
    // Disconnect Prisma client to prevent connection leaks
    await prisma.$disconnect();
  }
}

// If you need to handle other methods, you would add them here:
/*
export async function POST(request: Request) {
  // Logic to create a new product
  const body = await request.json();
  try {
    const newProduct = await prisma.product.create({
      data: body, // Ensure body matches your Prisma Product model
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { message: 'Failed to create product', error: (error as Error).message },
      { status: 500 }
    );
  }
}
*/