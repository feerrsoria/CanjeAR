import { Product, Vendor } from '@prisma/client';

export type ProductWithVendor = Product & {
  vendor: Vendor;
};