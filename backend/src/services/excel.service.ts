import {Request, Response} from "express";
import {env} from "../env";
import {MongoClient} from "mongodb";
import ExcelJS from "exceljs";

export const exportAsExcel = async (req: Request, res: Response) => {
  const {exportType} = req.params;
  const uri = env.DATABASE_URL;
  const dbName = "OprecFosti";
  const collectionName = exportType;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    let documents: any[] = [];

    // =========================
    // Data Fetching
    // =========================
    if (exportType === "Recruitment") {
      documents = await collection.find({}).toArray();
    } else if (exportType === "Presensi") {
      documents = await collection
        .aggregate([
          {
            $lookup: {
              from: "Recruitment",
              localField: "id_recruitment",
              foreignField: "_id",
              as: "recruitment",
            },
          },
          {
            $unwind: {
              path: "$recruitment",
              preserveNullAndEmptyArrays: true,
            },
          },
        ])
        .toArray();
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(collectionName);

    // =========================
    // Headers & Rows
    // =========================
    let headers: { header: string; key: string }[] = [];

    if (exportType === "Recruitment") {
      headers = [
        {header: "No. Peserta", key: "no_peserta"},
        {header: "Nama", key: "nama"},
        {header: "NIM", key: "nim"},
        {header: "Email", key: "email"},
        {header: "Telepon", key: "no_telepon"},
        {header: "Gender", key: "gender"},
        {header: "Alamat", key: "alamat"},
        {header: "Motivasi", key: "motivasi"},
        {header: "Fakultas", key: "fakultas"},
        {header: "Prodi", key: "prodi"},
        {header: "Status", key: "status"},
        {header: "Bergabung Pada", key: "createdAt"},
        {header: "Twibbon", key: "link_twibbon"},
        {header: "Video", key: "link_video"},
      ];

      worksheet.addRow(headers.map((h) => h.header));

      documents.forEach((doc, index) => {
        const row = {
          no_peserta: index + 1,
          nama: doc.nama || "",
          nim: doc.nim || "",
          email: doc.email || "",
          no_telepon: doc.no_telepon || "",
          gender: doc.gender || "",
          alamat: doc.alamat || "",
          motivasi: doc.motivasi || "",
          fakultas: doc.fakultas || "",
          prodi: doc.prodi || "",
          status: doc.status || "",
          createdAt: doc.createdAt
            ? new Date(doc.createdAt).toLocaleString("id-ID")
            : "",
          link_twibbon: doc.link_twibbon || "",
          link_video: doc.link_video || "",
        };
        worksheet.addRow(Object.values(row));
      });
    } else if (exportType === "Presensi") {
      headers = [
        {header: "No", key: "no"},
        {header: "Nama Mahasiswa", key: "nama"},
        {header: "NIM", key: "nim"},
        {header: "Fakultas", key: "fakultas"},
        {header: "Prodi", key: "prodi"},
        {header: "Waktu Datang", key: "waktu_datang"},
        {header: "Status Presensi", key: "status"},
        {header: "Created At", key: "createdAt"},
      ];

      worksheet.addRow(headers.map((h) => h.header));

      documents.forEach((doc, index) => {
        const row = {
          no: index + 1,
          nama: doc.recruitment?.nama || "",
          nim: doc.recruitment?.nim || "",
          fakultas: doc.recruitment?.fakultas || "",
          prodi: doc.recruitment?.prodi || "",
          waktu_datang: doc.waktu_datang
            ? new Date(doc.waktu_datang).toLocaleString("id-ID")
            : "",
          status: doc.status || "",
          createdAt: doc.createdAt
            ? new Date(doc.createdAt).toLocaleString("id-ID")
            : "",
        };

        const excelRow = worksheet.addRow(Object.values(row));

        // Coloring status cell
        let fillColor = "";
        if (doc.status === "HADIR") fillColor = "FF00FF00"; // Hijau
        if (doc.status === "IZIN") fillColor = "FF0000FF"; // Biru
        if (doc.status === "TIDAK_HADIR") fillColor = "FFFF0000"; // Merah

        if (fillColor) {
          const statusCell = excelRow.getCell(7); // kolom status
          statusCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {argb: fillColor},
          };
          statusCell.font = {bold: true, color: {argb: "FFFFFFFF"}};
        }
      });
    }

    // =========================
    // Style Header
    // =========================
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = {bold: true, size: 12};
      cell.alignment = {vertical: "middle", horizontal: "center"};
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb: "FFCCCCCC"},
      };
    });

    // Autosize columns
    // Auto adjust width columns
    if (worksheet.columns) {
      worksheet.columns.forEach((column) => {
        let maxLength = 0;
        column.eachCell?.({includeEmpty: true}, (cell) => {
          const columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 15 ? 15 : maxLength + 2; // minimal 15, kasih padding
      });
    }


    // Buffer response
    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${collectionName}.xlsx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (error) {
    console.error("Error exporting collection:", error);
    res.status(500).send("Error exporting collection");
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
};
