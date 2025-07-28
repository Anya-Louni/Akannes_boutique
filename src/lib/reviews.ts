import type { Review } from './types';

// Mock data for reviews
const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    productId: 'prod_1',
    productName: 'Gothic Lolita Skirt',
    customerName: 'Yasmine B.',
    rating: 5,
    title: 'Absolutely stunning!',
    text: "The quality is amazing and it looks even better in person. I feel like a real princess. The shipping was also very fast.",
    status: 'Approved',
    createdAt: new Date('2024-05-21T11:00:00Z'),
  },
  {
    id: 'rev_2',
    productId: 'prod_3',
    productName: 'Sweet Lolita JSK',
    customerName: 'Amina L.',
    rating: 5,
    title: 'My dream dress!',
    text: "I've been looking for a dress like this forever. It's so cute and comfortable. The packaging was adorable too!",
    status: 'Approved',
    createdAt: new Date('2024-05-19T16:20:00Z'),
  },
  {
    id: 'rev_3',
    productId: 'prod_7',
    productName: 'Rose Headdress',
    customerName: 'Nour H.',
    rating: 3,
    title: 'It\'s okay',
    text: "It's a bit smaller than I expected and one of the ribbons was slightly frayed. It's still wearable and cute, but the quality could be better for the price.",
    status: 'Pending',
    createdAt: new Date('2024-05-23T09:45:00Z'),
  },
   {
    id: 'rev_4',
    productId: 'prod_5',
    productName: 'Gyaru Denim Mini-skirt',
    customerName: 'Fatima Z.',
    rating: 4,
    title: 'Super stylish!',
    text: "Love this skirt! It's a perfect addition to my gyaru wardrobe. It's a little tight on the waist, so I recommend sizing up if you're between sizes.",
    status: 'Approved',
    createdAt: new Date('2024-05-18T12:00:00Z'),
  },
  {
    id: 'rev_5',
    productId: 'prod_2',
    productName: 'Lace Trimmed Blouse',
    customerName: 'Yasmine B.',
    rating: 4,
    title: 'Very pretty blouse',
    text: "The lace is delicate and pretty. It's a little sheer, so I have to wear a camisole underneath, but overall it's a great piece.",
    status: 'Rejected',
    createdAt: new Date('2024-05-22T14:30:00Z'),
  },
];

export async function getReviews(): Promise<Review[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_REVIEWS.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
