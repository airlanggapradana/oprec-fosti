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
    fakultas:
      | "FKIP"
      | "FEB"
      | "FH"
      | "FT"
      | "FF"
      | "FP"
      | "FG"
      | "FAI"
      | "FIK"
      | "FK"
      | "FKG"
      | "FKI";
    prodi: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type LoginResponse = {
  message: string;
  token: string;
};

export type AllRecordsResponse = {
  message: string;
  data: {
    id: string;
    nama: string;
    email: string;
    nim: string;
    no_telepon: string;
    gender: string;
    alamat: string;
    motivasi: string;
    fakultas: string;
    prodi: string;
    createdAt: string;
    updatedAt: string;
  }[];
};
