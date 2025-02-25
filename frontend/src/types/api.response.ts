export type CreateRecordResponse = {
  message: string;
  data: {
    id: string;
    nama: string;
    email: string;
    nim: string;
    no_telepon: string;
    gender: "LAKI_LAKI" | "PEREMPUAN";
    alamat: string;
    motivasi: string;
    fakultas: "FAKULTAS KOMUNIKASI DAN INFORMATIKA";
    prodi: "TEKNIK_INFORMATIKA" | "SISTEM_INFORMASI" | "ILMU_KOMUNIKASI";
    createdAt: string;
    updatedAt: string;
  };
};

export type LoginResponse = {
  message: string;
  token: string;
};
