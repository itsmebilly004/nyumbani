import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/password.js';

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2] || 'admin@nyumbani.local';
  const name = process.argv[3] || 'Nyumbani Admin';
  const password = process.argv[4] || 'ChangeMe123!';

  console.log('Seeding admin user...');
  console.log(`Email: ${email}`);
  console.log(`Name: ${name}`);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('User with this email already exists. No changes made.');
    return;
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'admin',
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      created_at: true,
    },
  });

  console.log('Admin user created successfully:');
  console.log(user);
}

main()
  .catch((err) => {
    console.error('Error seeding admin user:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
