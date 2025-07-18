import {PrismaClient} from '@prisma/client';
import {faker} from '@faker-js/faker';
import {Fakultas} from '@prisma/client';

const prisma = new PrismaClient();


const data = Array.from({length: 100}).map((_, i) => ({
  nama: faker.person.fullName(),
  prodi: faker.lorem.sentence(1),
  email: faker.internet.email(),
  nim: faker.string.numeric(10),
  no_telepon: faker.phone.number(),
  gender: faker.helpers.arrayElement(["LAKI_LAKI", "PEREMPUAN"]),
  alamat: faker.location.streetAddress(),
  motivasi: faker.lorem.paragraph(),
  fakultas: faker.helpers.enumValue(Fakultas),
  createdAt: faker.date.past()
}))

async function main() {
  await prisma.recruitment.createMany({
    data,
  })
}

// async function main() {
//   // Clear existing data
//   await prisma.recruitment.deleteMany();
// }

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
  console.log('Database seeding completed successfully.');
})