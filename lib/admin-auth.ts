import { auth } from '@clerk/nextjs/server';

const ADMIN_USER_IDS = (process.env.ADMIN_CLERK_IDS || '')
  .split(',')
  .map(id => id.trim())
  .filter(Boolean);

export async function requireAdmin() {
  const { userId } = await auth();
  
  if (!userId || !ADMIN_USER_IDS.includes(userId)) {
    throw new Error('Unauthorized: Admin access required');
  }
  
  return userId;
}

export async function isAdmin() {
  const { userId } = await auth();
  return userId ? ADMIN_USER_IDS.includes(userId) : false;
}

export function getAdminUserIds() {
  return ADMIN_USER_IDS;
}
