import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  try {
    const adminCount = await prisma.admin.count();
    const admins = await prisma.admin.findMany({
      select: { username: true }
    });
    console.log(`Total admins in DB: ${adminCount}`);
    console.log('Admin usernames:', admins.map(a => a.username));
  } catch (err) {
    console.error('Database connection failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
