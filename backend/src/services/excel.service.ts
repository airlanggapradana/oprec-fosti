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

    // Fetch all documents
    const documents = await collection.find({}).toArray();
    console.log(`Fetched ${documents.length} documents`);

    // Create workbook + worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(collectionName);

    // ========================
    // Generate headers (fixed order)
    // ========================
    let headers = Object.keys(documents[0] || {});
    if (exportType === "Recruitment") {
      headers.push("Up Twibbon", "Up Video");
    }
    worksheet.addRow(headers);

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = {bold: true, color: {argb: "FFFFFFFF"}};
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {argb: "FF4F81BD"},
      };
      cell.alignment = {vertical: "middle", horizontal: "center"};
      cell.border = {
        top: {style: "thin", color: {argb: "FF000000"}},
        bottom: {style: "thin", color: {argb: "FF000000"}},
        left: {style: "thin", color: {argb: "FF000000"}},
        right: {style: "thin", color: {argb: "FF000000"}},
      };
    });

    // ========================
    // Add data rows (using headers order)
    // ========================
    documents.forEach((doc) => {
      const row = headers.map((key) => {
        const value = doc[key as keyof typeof doc];
        return value === null || value === undefined ? "NULL" : value;
      });

      // Tambah default checkbox kalau Recruitment
      if (exportType === "Recruitment") {
        row[headers.indexOf("Up Twibbon")] = "☐";
        row[headers.indexOf("Up Video")] = "☐";
      }

      worksheet.addRow(row);
    });

    // ========================
    // Dropdown hanya kalau Recruitment
    // ========================
    if (exportType === "Recruitment") {
      const lastColIndex = worksheet.getRow(1).cellCount;
      const twibbonCol = lastColIndex - 1;
      const videoCol = lastColIndex;

      // Dropdown untuk Up Twibbon
      worksheet.getColumn(twibbonCol).eachCell((cell, rowNumber) => {
        if (rowNumber > 1) {
          cell.dataValidation = {
            type: "list",
            allowBlank: true,
            formulae: ['"☐,☑"'],
          };
        }
      });

      // Dropdown untuk Up Video
      worksheet.getColumn(videoCol).eachCell((cell, rowNumber) => {
        if (rowNumber > 1) {
          cell.dataValidation = {
            type: "list",
            allowBlank: true,
            formulae: ['"☐,☑"'],
          };
        }
      });
    }

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

    // Set fixed width for all columns
    worksheet.columns.forEach((col) => {
      col.width = 20;
    });

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
