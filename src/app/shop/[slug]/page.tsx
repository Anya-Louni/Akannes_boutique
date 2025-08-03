import { notFound } from 'next/navigation';
import ProductDetailsClient from '@/components/product/product-details-client';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from 'next/link';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/lib/types';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

async function getProductBySlug(slug: string): Promise<Product | null> {
    try {
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('slug', '==', slug), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return { 
            id: doc.id, 
            ...data,
            // Convert Firestore timestamp to serializable date
            createdAt: data.createdAt?.toDate?.() || new Date(),
        } as unknown as Product;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export async function generateStaticParams() {
    try {
        const productsCol = collection(db, 'products');
        const productSnapshot = await getDocs(productsCol);
        return productSnapshot.docs.map(doc => ({
            slug: doc.data().slug,
        }));
    } catch (error) {
        console.log('Error generating static params:', error);
        // Return empty array to allow dynamic rendering
        return [];
    }
}

// Enable dynamic routes for missing products
export const dynamicParams = true;

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb className="mb-8">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/shop">Shop</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="font-headline">{product.name}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
      <ProductDetailsClient product={product} />
    </div>
  );
}
