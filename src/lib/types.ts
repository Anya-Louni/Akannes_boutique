import { z } from 'zod';

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  styleTags: string[];
  isFeatured?: boolean;
};

export type Category = {
    id: string;
    name: string;
    createdAt: Date;
}


// We still need a schema for the form on the client side.
export const ProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  category: z.string().min(1, 'Please select a category'),
  sizes: z.array(z.string()).min(1, 'Please select at least one size'),
  colors: z.array(z.string()).min(1, 'Please add at least one color'),
  styleTags: z.array(z.string()).min(1, 'Please add at least one style tag'),
  images: z.array(z.string()).min(1, 'Please add at least one image URL'),
  inStock: z.boolean(),
  isFeatured: z.boolean(),
});

export type ProductFormValues = z.infer<typeof ProductSchema>;
