const prisma = require('../config/prisma');

function calculateCarbon(category, item, amount) {
  const transportEmission = { mobil: 0.192, motor: 0.103, bus: 0.082, sepeda: 0, jalan: 0 };
  const foodEmission = { sapi: 27, ayam: 6.9, ikan: 6.1, sayur: 2, nasi: 4, telur: 4.8 };
  const energyEmission = { listrik: 0.8, lampu: 0.05, ac: 1.5, komputer: 0.2 };

  const maps = { transportasi: transportEmission, makanan: foodEmission, energi: energyEmission };
  const selected = maps[category];

  if (!selected ) throw new Error(`Kategori '${category}' tidak dikenali`);
  if (!selected[item.toLowerCase()]) throw new Error(`Item '${item}' tidak dikenali dalam kategori ${category}`);

  return selected[item.toLowerCase()] * amount;
}


async function recordCarbon(userId, category, item, amount) {
  const carbonEmission = calculateCarbon(category, item, amount);
  const record = await prisma.carbonRecord.create({
    data: { userId, category, item, amount, carbonEmission },
  });

  const treesNeeded = carbonEmission / 0.0596;

  return { record, treesNeeded };
}

async function getUserCarbonStats(userId) {
  const records = await prisma.carbonRecord.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  const total = records.reduce((sum, r) => sum + r.carbonEmission, 0);
  const weekly = total / 7; // rata-rata per minggu
  const treesNeeded = total / 0.0596;

  return { total, weekly, treesNeeded, records };
}

module.exports = { recordCarbon, getUserCarbonStats };
