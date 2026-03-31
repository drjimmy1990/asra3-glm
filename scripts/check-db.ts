import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  const settings = await prisma.siteSetting.findMany({
    where: {
      key: {
        in: [
          'trusted_tools_json',
          'adv_heading_en',
          'adv_heading_ar',
          'adv_tier1_features_ar'
        ]
      }
    }
  });
  console.log(settings);
}

check().catch(console.error).finally(() => prisma.$disconnect());
