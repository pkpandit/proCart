import { z } from "zod";

export const ProductSchema = z.object({
  title: z.string().min(3),
  category: z.string(),
  price: z.number().positive(),
  rating: z.number(),
  reviewsCount: z.number(),
  images: z.array(z.string()),
  unit: z.string(),
  inStock: z.boolean(),
});
