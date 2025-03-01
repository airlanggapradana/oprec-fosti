import { Request, Response } from "express";
import env from "../env";
import { MongoClient } from "mongodb";
import ExcelJS from "exceljs";

export const exportAsExcel = async (req: Request, res: Response) => {
  const uri = env.MONGO_URI;
  const dbName = "OprecFosti";
  const collectionName = "Recruitment";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Fetch all documents from the collection
    const documents = await collection.find({}).toArray();
    console.log(`Fetched ${documents.length} documents from the collection`);

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(collectionName);

    // Add headers to the worksheet
    if (documents.length > 0) {
      const headers = Object.keys(documents[0]);
      worksheet.addRow(headers);

      // Style the header row
      const headerRow = worksheet.getRow(1);
      headerRow.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: "FFFFFFFF" } }; // Bold and white font
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF4F81BD" }, // Blue background
        };
        cell.alignment = { vertical: "middle", horizontal: "center" }; // Center alignment
        cell.border = {
          top: { style: "thin", color: { argb: "FF000000" } },
          bottom: { style: "thin", color: { argb: "FF000000" } },
          left: { style: "thin", color: { argb: "FF000000" } },
          right: { style: "thin", color: { argb: "FF000000" } },
        };
      });
    }

    // Add data rows to the worksheet
    documents.forEach((doc) => {
      const row = Object.values(doc);
      worksheet.addRow(row);

      // Style the data rows
      const dataRow = worksheet.getRow(worksheet.rowCount);
      dataRow.eachCell((cell) => {
        cell.border = {
          top: { style: "thin", color: { argb: "FF000000" } },
          bottom: { style: "thin", color: { argb: "FF000000" } },
          left: { style: "thin", color: { argb: "FF000000" } },
          right: { style: "thin", color: { argb: "FF000000" } },
        };
        cell.alignment = { vertical: "middle", horizontal: "center" };
      });
    });

    // Adjust column widths
    worksheet.columns.forEach((column) => {
      column.width = 20; // Set a fixed width for all columns
    });

    // Write the workbook to a buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Set response headers for file download
    res.setHeader("Content-Disposition", "attachment; filename=export.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Send the buffer as the response
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
