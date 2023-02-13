import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      productType:      'Guitar',
      guitarType :      'Acoustic',
      photo:          '1.img',
      chordQty:         4,
      price     :       100,
      rating  :         4,
      title   :         "The best Guitar ",
      description   :   "The best guitar to start playing",
      userId    :       '1',
      sku   :           "fdfet"
      },

  });
  await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      productType:      'Guitar',
      guitarType :      'Ukulele',
      photo:           '2.img',
      chordQty:         7,
      price     :       100,
      rating  :         4,
      title   :         "LIANA Z100 ",
      description   :   "The best guitar to start playing",
      userId    :       '1',
      sku   :           "1"
      },

  });
  await prisma.product.upsert({
    where: { id: 3 },
    update: {},
    create: {
      productType:      'Guitar',
      guitarType :      'Electric',
      photo:          '3.img',
      chordQty:         4,
      price     :       100,
      rating  :         4,
      title   :         "ЧЕСТЕР BASS ",
      description   :   "The best guitar to start playing",
      userId    :       '1',
      sku   :           "fdfet"
      },

  });
  await prisma.product.upsert({
    where: { id: 4 },
    update: {},
    create: {
      productType:      'Guitar',
      guitarType :      'Acoustic',
      photo:          '3.img',
      chordQty:         6,
      price     :       100,
      rating  :         4,
      title   :         "ROMAN RX",
      description   :   "The best guitar to start playing",
      userId    :       '1',
      sku   :           "fdfet"
      },

  });

}



fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
