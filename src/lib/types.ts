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
