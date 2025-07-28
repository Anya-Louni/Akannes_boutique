export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'Gothic Lolita' | 'Sweet Lolita' | 'Gyaru' | 'Shoujo';
  colors: string[];
  sizes: string[];
  inStock: boolean;
  styleTags: string[];
  isFeatured?: boolean;
};
