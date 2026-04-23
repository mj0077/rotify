const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'rotify2024';

  // Check if admin already exists
  const existing = await prisma.admin.findUnique({
    where: { username },
  });

  if (existing) {
    console.log(`Admin "${username}" already exists. Skipping.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
      name: 'Admin',
    },
  });

  console.log(`Admin user "${username}" created successfully.`);
  console.log('You can now login at /admin/login');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
