export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'Dresses' | 'Tops' | 'Skirts' | 'Accessories' | string;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  styleTags: string[];
  isFeatured?: boolean;
};
