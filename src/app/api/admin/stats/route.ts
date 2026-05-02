import { NextResponse } from 'next/server';
import { listOrders, listUsers, newsletterSize } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const [orders, users, subs] = await Promise.all([listOrders(), listUsers(), newsletterSize()]);
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  return NextResponse.json({
    revenue,
    orderCount: orders.length,
    userCount: users.length,
    subscriberCount: subs,
    recentOrders: orders.slice(0, 8),
  });
}
