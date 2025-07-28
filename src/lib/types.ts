export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'Dresses' | 'Tops' | 'Skirts' | 'Accessories';
  colors: string[];
  sizes: string[];
  inStock: boolean;
  styleTags: string[];
  isFeatured?: boolean;
};
