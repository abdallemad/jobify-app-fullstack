const { PrismaClient } = require('@prisma/client');
const data = require('./mock-data.json');
const prisma = new PrismaClient();

async function main() {
  const clerkId = 'user_2mPy4VtpO9NFRkzQVbiMr1Z8MbD';
  const jobs = data.map((job) => {
    const {company,location,mode,position,status,createdAt} = job
    return {
      company,
      location,
      mode,
      position,
      status,
      clerkId,
      createdAt
    };
  });
  for (const job of jobs) {
    await prisma.job.create({
      data: job,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('done')
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });