export interface CheckRecruitmentStatusResponse {
  message: string;
  data: Recruitment;
}

export interface Recruitment {
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
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
