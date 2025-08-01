import { Product } from '@/lib/types';

// Since we can't directly access Instagram's API without proper authentication,
// we'll create a manual product data structure that can be updated with Instagram posts
// In a real implementation, you would use Instagram Basic Display API or Instagram Graph API

export const instagramProducts: Omit<Product, 'id'>[] = [
  {
    slug: "sweet-lolita-dress-pink",
    name: "Sweet Lolita Dress - Pink Dreams",
    description: "Adorable pink sweet lolita dress with layers of ruffles and bow details. Perfect for tea parties and magical moments.",
    price: 15000,
    images: [
      "https://placehold.co/600x800/f8bbd9/ffffff?text=Sweet+Lolita+Dress",
      "https://placehold.co/600x800/f8bbd9/ffffff?text=Detail+View",
      "https://placehold.co/600x800/f8bbd9/ffffff?text=Back+View"
    ],
    category: "Sweet Lolita",
    colors: ["Pink", "White"],
    sizes: ["S", "M", "L"],
    inStock: true,
    isFeatured: true,
    stockQuantity: 5,
  },
  {
    slug: "gothic-lolita-dress-black",
    name: "Gothic Lolita Dress - Midnight Elegance",
    description: "Elegant black gothic lolita dress with intricate lace details and Victorian-inspired design.",
    price: 18000,
    images: [
      "https://placehold.co/600x800/2d2d2d/ffffff?text=Gothic+Lolita+Dress",
      "https://placehold.co/600x800/2d2d2d/ffffff?text=Lace+Detail",
      "https://placehold.co/600x800/2d2d2d/ffffff?text=Full+Length"
    ],
    category: "Gothic Lolita",
    colors: ["Black", "Deep Purple"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    isFeatured: true,
    stockQuantity: 3,
  },
  {
    slug: "gyaru-top-sparkle",
    name: "Gyaru Sparkle Top",
    description: "Glamorous gyaru-style top with sequins and bold design. Perfect for making a statement.",
    price: 8500,
    images: [
      "https://placehold.co/600x800/ffd700/000000?text=Gyaru+Sparkle+Top",
      "https://placehold.co/600x800/ffd700/000000?text=Sequin+Detail",
      "https://placehold.co/600x800/ffd700/000000?text=Fit+View"
    ],
    category: "Gyaru",
    colors: ["Gold", "Silver", "Rose Gold"],
    sizes: ["S", "M", "L"],
    inStock: true,
    isFeatured: false,
    stockQuantity: 8,
  },
  {
    slug: "classic-lolita-skirt",
    name: "Classic Lolita A-Line Skirt",
    description: "Timeless classic lolita skirt with elegant silhouette and vintage-inspired print.",
    price: 12000,
    images: [
      "https://placehold.co/600x800/d4c5b0/000000?text=Classic+Lolita+Skirt",
      "https://placehold.co/600x800/d4c5b0/000000?text=Print+Detail",
      "https://placehold.co/600x800/d4c5b0/000000?text=Side+View"
    ],
    category: "Classic Lolita",
    colors: ["Beige", "Navy", "Burgundy"],
    sizes: ["S", "M", "L"],
    inStock: true,
    isFeatured: true,
    stockQuantity: 4,
  },
  {
    slug: "kawaii-accessories-set",
    name: "Kawaii Accessories Set",
    description: "Complete set of kawaii accessories including hair clips, bow ties, and cute jewelry.",
    price: 4500,
    images: [
      "https://placehold.co/600x600/ffb6c1/ffffff?text=Kawaii+Accessories",
      "https://placehold.co/600x600/ffb6c1/ffffff?text=Hair+Clips",
      "https://placehold.co/600x600/ffb6c1/ffffff?text=Complete+Set"
    ],
    category: "Accessories",
    colors: ["Pink", "Purple", "Blue"],
    sizes: ["One Size"],
    inStock: true,
    isFeatured: false,
    stockQuantity: 12,
  },
  {
    slug: "sweet-lolita-jsk-blue",
    name: "Sweet Lolita JSK - Ocean Dreams",
    description: "Beautiful blue jumperskirt with sailor-inspired details and cute anchor prints.",
    price: 16500,
    images: [
      "https://placehold.co/600x800/87ceeb/ffffff?text=Sweet+Lolita+JSK",
      "https://placehold.co/600x800/87ceeb/ffffff?text=Anchor+Print",
      "https://placehold.co/600x800/87ceeb/ffffff?text=Full+Coord"
    ],
    category: "Sweet Lolita",
    colors: ["Sky Blue", "Navy", "White"],
    sizes: ["S", "M", "L"],
    inStock: true,
    isFeatured: true,
    stockQuantity: 2,
  }
];

// Function to simulate fetching from Instagram
export async function fetchInstagramProducts(): Promise<Omit<Product, 'id'>[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real implementation, this would:
  // 1. Connect to Instagram Basic Display API
  // 2. Fetch recent posts from @akannesboutique
  // 3. Parse captions for product information
  // 4. Extract images and details
  // 5. Return formatted product data
  
  return instagramProducts;
}

// Helper function to parse Instagram post data (mock implementation)
export function parseInstagramPost(post: any): Omit<Product, 'id'> | null {
  // This would parse Instagram post data and extract:
  // - Product name from caption
  // - Price from caption
  // - Images from media
  // - Category from hashtags
  // - Description from caption
  
  // Mock implementation
  return null;
}
