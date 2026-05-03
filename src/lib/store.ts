import bcrypt from 'bcryptjs';
import type { Order, User } from '@/types';
import { generateId } from '@/lib/utils';

/**
 * Lightweight in-memory data store for users and orders.
 *
 * In production, swap these functions for MongoDB (or any DB) calls.
 * The exported API is intentionally async to make that swap trivial.
 *
 * The store is mounted on `globalThis` so it survives Next.js dev hot-reloads
 * within the same Node process. It's intended for demo purposes only.
 */

interface Store {
  users: Map<string, User>; // by id
  usersByEmail: Map<string, string>; // email -> id
  orders: Map<string, Order>;
  newsletter: Set<string>;
  referralUses: Map<string, number>; // referral code -> uses
}

const g = globalThis as unknown as { __ryzeStore?: Store };

function bootstrap(): Store {
  const store: Store = {
    users: new Map(),
    usersByEmail: new Map(),
    orders: new Map(),
    newsletter: new Set(),
    referralUses: new Map(),
  };

  // Seed an admin account
  const adminId = 'usr_admin_seed';
  const admin: User = {
    id: adminId,
    email: 'admin@ryze.gg',
    username: 'admin',
    passwordHash: bcrypt.hashSync('admin1234', 10),
    role: 'admin',
    createdAt: new Date().toISOString(),
    xp: 4200,
    achievements: ['a_first_purchase', 'a_top_gamer', 'a_setup_built'],
    referralCode: 'ADMIN-RYZE',
  };
  store.users.set(admin.id, admin);
  store.usersByEmail.set(admin.email, admin.id);

  // Seed a demo player
  const demoId = 'usr_demo_seed';
  const demo: User = {
    id: demoId,
    email: 'player@ryze.gg',
    username: 'NovaStrike',
    passwordHash: bcrypt.hashSync('player1234', 10),
    role: 'user',
    createdAt: new Date().toISOString(),
    xp: 850,
    achievements: ['a_first_purchase', 'a_setup_built'],
    referralCode: 'NOVA-RYZE',
  };
  store.users.set(demo.id, demo);
  store.usersByEmail.set(demo.email, demo.id);

  return store;
}

export const store: Store = g.__ryzeStore ?? (g.__ryzeStore = bootstrap());

// ---------------- Users ----------------

export async function createUser(input: {
  email: string;
  username: string;
  password: string;
  referredBy?: string;
}): Promise<User> {
  const email = input.email.toLowerCase().trim();
  if (store.usersByEmail.has(email)) {
    throw new Error('يوجد بالفعل حساب بهذا البريد الإلكتروني.');
  }
  const passwordHash = await bcrypt.hash(input.password, 10);
  const user: User = {
    id: generateId('usr'),
    email,
    username: input.username.trim(),
    passwordHash,
    role: 'user',
    createdAt: new Date().toISOString(),
    xp: 0,
    achievements: [],
    referralCode: `${input.username.toUpperCase().slice(0, 6)}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`,
    referredBy: input.referredBy,
  };
  store.users.set(user.id, user);
  store.usersByEmail.set(email, user.id);
  if (input.referredBy) {
    store.referralUses.set(input.referredBy, (store.referralUses.get(input.referredBy) ?? 0) + 1);
  }
  return user;
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const id = store.usersByEmail.get(email.toLowerCase().trim());
  return id ? store.users.get(id) : undefined;
}

export async function findUserById(id: string): Promise<User | undefined> {
  return store.users.get(id);
}

export async function verifyPassword(email: string, password: string): Promise<User | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  return ok ? user : null;
}

export async function awardXp(userId: string, xp: number) {
  const user = store.users.get(userId);
  if (!user) return;
  user.xp += xp;
}

export async function grantAchievement(userId: string, achievementId: string) {
  const user = store.users.get(userId);
  if (!user) return;
  if (!user.achievements.includes(achievementId)) {
    user.achievements.push(achievementId);
  }
}

export async function listUsers(): Promise<User[]> {
  return Array.from(store.users.values());
}

// ---------------- Orders ----------------

export async function createOrder(input: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> {
  const order: Order = {
    ...input,
    id: generateId('ord'),
    createdAt: new Date().toISOString(),
    status: 'paid',
  };
  store.orders.set(order.id, order);
  return order;
}

export async function listOrders(): Promise<Order[]> {
  return Array.from(store.orders.values()).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function listOrdersForUser(email: string): Promise<Order[]> {
  return (await listOrders()).filter((o) => o.userEmail.toLowerCase() === email.toLowerCase());
}

export async function setOrderStatus(id: string, status: Order['status']) {
  const o = store.orders.get(id);
  if (o) o.status = status;
  return o;
}

// ---------------- Newsletter ----------------

export async function subscribeNewsletter(email: string) {
  store.newsletter.add(email.toLowerCase().trim());
}

export async function newsletterSize() {
  return store.newsletter.size;
}
