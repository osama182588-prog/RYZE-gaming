import { NextRequest, NextResponse } from 'next/server';
import { filterProducts } from '@/data/products';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const list = filterProducts({
    q: searchParams.get('q') || undefined,
    category: searchParams.get('category') || undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    rating: searchParams.get('rating') ? Number(searchParams.get('rating')) : undefined,
    badges: searchParams.getAll('badges'),
    sort: (searchParams.get('sort') as 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | null) || 'featured',
  });
  return NextResponse.json({ products: list, count: list.length });
}
