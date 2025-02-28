import { UserStatus } from "./schema";
import { FiUser } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";

export const callTypes = new Map<UserStatus, string>([
  ["active", "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200"],
  ["inactive", "bg-neutral-300/40 border-neutral-300"],
  ["invited", "bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300"],
  [
    "suspended",
    "bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10",
  ],
]);

export const genderTypes = [
  {
    label: "Laki-laki",
    value: "LAKI_LAKI",
  },
  {
    label: "Perempuan",
    value: "PEREMPUAN",
  },
] as const;

export const facultyTypes = [
  {
    label: "Fakultas Komunikasi dan Informatika",
    value: "FAKULTAS KOMUNIKASI DAN INFORMATIKA",
  },
];

export const prodyType = [
  {
    label: "Teknik Informatika",
    value: "TEKNIK_INFORMATIKA",
  },
  {
    label: "Sistem Informasi",
    value: "SISTEM_INFORMASI",
  },
  {
    label: "Pendidikan Teknik Informatika",
    value: "PENDIDIKAN_TEKNIK_INFORMATIKA",
  },
];
