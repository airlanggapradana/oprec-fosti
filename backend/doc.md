# OPREC FOSTI API SPEC

## Recruitment

Endpoint : **POST** /api/recruitment

Request Body :

```json
{
  "nama": "guest1",
  "nim": "LXXXXXXXXX",
  "email": "guest1@test.com",
  "no_telepon": "0812XXXXXX",
  "gender": "LAKI_LAKI" | "PEREMPUAN",
  "alamat": "district x",
  "motivasi": "apapun yg terjadi tetaplah bernapas",
  "fakultas": "FAKULTAS KOMUNIKASI DAN INFORMATIKA",
  "prodi": "SISTEM_INFORMASI" | "TEKNIK_INFORMATIKA" | "ILMU_KOMUNIKASI",
}
```

Response (Success) :

```json
{
  "message": "Data berhasil disimpan",
  "data": {
    "id": "aidhwqheeondndihq8hwd",
    "nama": "guest1",
    "nim": "LXXXXXXXXX",
    "email": "guest1@test.com",
    "no_telepon": "0812XXXXXX",
    "gender": "LAKI-LAKI" | "PEREMPUAN",
    "alamat": "district x",
    "motivasi": "apapun yg terjadi tetaplah bernapas",
    "fakultas": "FAKULTAS KOMUNIKASI DAN INFORMATIKA",
    "prodi": "SISTEM_INFORMASI" | "TEKNIK_INFORMATIKA" |  "ILMU_KOMUNIKASI",
  }
}
```

Response (Failed) :

```json
{
  "message": "Validation failed",
  "errors": {
    "code": "invalid_type",
    "expected": "string",
    "received": "undefined",
    "path": ["nama"],
    "message": "Required"
  }
}
```
