import { products } from '@/lib/products';
import { notFound } from 'next/navigation';
import ProductDetailsClient from '@/components/product/product-details-client';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from 'next/link';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// This function can be used for static generation
export async function generateStaticParams() {
  return products.map(product => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.slug === params.slug);

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
