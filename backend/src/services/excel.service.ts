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

    // Fetch documents
    const documents = await collection.find({}).toArray();
    console.log(`Fetched ${documents.length} documents`);

    // Create workbook + worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(collectionName);

    // ========================
    // Define headers (custom order)
    // ========================
    const headers = [
      {header: "No. Peserta", key: "no_peserta"},
      {header: "Nama Mahasiswa", key: "nama"},
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

    // ========================
    // Style header row (bold, standout colors)
    // ========================
    const colors = [
      "FF0000", // Red
      "0000FF", // Blue
      "008000", // Green
      "FF8C00", // Dark Orange
      "800080", // Purple
      "FF1493", // Deep Pink
      "008B8B", // Dark Cyan
      "FFD700", // Gold
      "A52A2A", // Brown
      "FF4500", // Orange Red
      "2E8B57", // Sea Green
      "1E90FF", // Dodger Blue
      "8B0000", // Dark Red
      "000000", // Black
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell, colNumber) => {
      cell.font = {bold: true, color: {argb: "FFFFFFFF"}, size: 12};
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb: colors[colNumber - 1]},
      };
      cell.alignment = {vertical: "middle", horizontal: "center"};
      cell.border = {
        top: {style: "medium", color: {argb: "FFFFFFFF"}},
        bottom: {style: "medium", color: {argb: "FFFFFFFF"}},
        left: {style: "medium", color: {argb: "FFFFFFFF"}},
        right: {style: "medium", color: {argb: "FFFFFFFF"}},
      };
    });

    // ========================
    // Add data rows
    // ========================
    documents.forEach((doc, index) => {
      const row = [
        index + 1, // No. Peserta (increment)
        doc.nama || "",
        doc.nim || "",
        doc.email || "",
        doc.no_telepon || "",
        doc.gender || "",
        doc.alamat || "",
        doc.motivasi || "",
        doc.fakultas || "",
        doc.prodi || "",
        doc.status || "",
        doc.createdAt || "",
        doc.link_twibbon || "",
        doc.link_video || "",
      ];

      worksheet.addRow(row);
    });

    // Style data rows
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.eachCell((cell) => {
          cell.border = {
            top: {style: "thin", color: {argb: "FF000000"}},
            bottom: {style: "thin", color: {argb: "FF000000"}},
            left: {style: "thin", color: {argb: "FF000000"}},
            right: {style: "thin", color: {argb: "FF000000"}},
          };
          cell.alignment = {vertical: "middle", horizontal: "center"};
        });
      }
    });

    // Set default width
    worksheet.columns.forEach((col) => {
      col.width = 25;
    });

    // Adjust khusus untuk kolom Twibbon & Video
    worksheet.getColumn(13).width = 115;
    worksheet.getColumn(14).width = 120;


    // Buffer & response
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

    console.log("Excel file sent to client");
  } catch (error) {
    console.error("Error exporting collection:", error);
    res.status(500).send("Error exporting collection");
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
};
