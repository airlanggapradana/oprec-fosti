import { faker } from "@faker-js/faker";

export const users = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    id: faker.string.uuid(),
    nama: faker.person.fullName(),
    email: faker.internet.email(),
    nim: faker.string.uuid(),
    no_telephone: faker.phone.number(),
    gender: faker.helpers.arrayElement(["LAKI_LAKI", "PEREMPUAN"]),
    alamat: faker.location.streetAddress(),
    motivasi: faker.lorem.sentence(),
    fakultas: faker.company.name(),
    prodi: faker.company.name(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
});
