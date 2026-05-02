import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, getRelatedProducts, PRODUCTS } from '@/data/products';
import { ProductDetail } from './product-detail';
import { ProductCard } from '@/components/product/product-card';

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.tagline,
    openGraph: {
      title: p.name,
      description: p.tagline,
      images: p.images.slice(0, 1),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = getRelatedProducts(slug, 4);

  return (
    <div className="ryze-container py-12">
      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 font-display text-3xl font-black">Pair with</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
