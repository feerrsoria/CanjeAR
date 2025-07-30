import { Service, Vendor } from "@prisma/client";

export type ServiceWithVendor = Service & {
  vendor: Vendor;
};