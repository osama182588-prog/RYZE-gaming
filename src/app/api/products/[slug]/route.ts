import { NextRequest, NextResponse } from 'next/server';
import { getProduct, getRelatedProducts } from '@/data/products';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ product, related: getRelatedProducts(slug, 4) });
}
