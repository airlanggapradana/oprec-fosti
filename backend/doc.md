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

## SignIn

Endpoint : **POST** /api/auth/signin

Request Body :

```json
{
  "username": "adminadmin",
  "password": "admin123"
}
```

Response (Success) :

```json
{
  "message": "Success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJiY2FhOTFkLTM3YjAtNGNiNS05YmE1LTliMWZjZjIyMjk4NCIsInVzZXJuYW1lIjoiYWRtaW5hZG1pbiIsImlhdCI6MTc0MDM5MTUwMiwiZXhwIjoxNzQwNDc3OTAyfQ.C9H3ozZWFCC9l5dhdMHz8VOb-ZOMuoApWAkrDo6CdAE"
}
```

Response (Failed) :

```json
{
  "message": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["username"],
      "message": "Required"
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["password"],
      "message": "Required"
    }
  ]
}
```

## Delete Record

Endpoint : **DELETE** api/recruitment

Authorization : Bearer Token

Response (Success)

```json
{
  "message": "Data recruitment berhasil dihapus"
}
```

Response (Failed)

```json
{
  "message": "Unathorized"
}
```
