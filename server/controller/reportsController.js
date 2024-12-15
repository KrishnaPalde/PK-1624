const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");
const path = require("path");
const nodemailer = require("nodemailer");

const generateExcel = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Booking Report");

      // Add letterhead
      worksheet.mergeCells("A1:G1");
      const titleCell = worksheet.getCell("A1");
      titleCell.value = "Authorized Booking Report";
      titleCell.font = { size: 16, bold: true };
      titleCell.alignment = { vertical: "middle", horizontal: "center" };

      worksheet.mergeCells("A2:G2");
      const subtitleCell = worksheet.getCell("A2");
      subtitleCell.value =
        "Tranquil Trails | Dehradun | Contact: +91 7673-992288";
      subtitleCell.font = { size: 12, italic: true };
      subtitleCell.alignment = { vertical: "middle", horizontal: "center" };

      worksheet.addRow([]); // Add an empty row for spacing

      // Add table headers
      const headers = [
        "Booking ID",
        "Name",
        "Room Type",
        "Check-In",
        "Check-Out",
        "Total Payment",
        "Source",
      ];
      worksheet.addRow(headers);
      const headerRow = worksheet.getRow(4);
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "D9E1F2" },
        };
      });

      // Add booking data rows
      data.forEach((booking, index) => {
        const bookingId = booking.bookingId || "N/A";
        const name = `${booking.firstName} ${booking.lastName}` || "N/A";
        const roomType = booking.rooms.join(", ") || "N/A";
        const checkIn = booking.checkInDate
          ? new Date(booking.checkInDate).toLocaleDateString("en-US")
          : "N/A";
        const checkOut = booking.checkOutDate
          ? new Date(booking.checkOutDate).toLocaleDateString("en-US")
          : "N/A";
        const totalPayment = `₹${booking.totalPayment || 0}`;
        const source = booking.source || "N/A";

        const row = worksheet.addRow([
          bookingId,
          name,
          roomType,
          checkIn,
          checkOut,
          totalPayment,
          source,
        ]);

        // Alternate row color
        if (index % 2 === 0) {
          row.eachCell((cell) => {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "F7F7F7" },
            };
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          });
        } else {
          row.eachCell((cell) => {
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          });
        }
      });

      // Adjust column widths
      worksheet.columns.forEach((column) => {
        column.width = 25;
        column.alignment = { vertical: "middle", horizontal: "center" };
      });

      worksheet.addRow([]);
      worksheet.addRow([]);
      worksheet.addRow([]);
      // Add footer
      const footerRow = worksheet.addRow([]);
      footerRow.getCell(1).value = `Generated on: ${new Date().toLocaleString(
        "en-IN"
      )}`;
      footerRow.getCell(1).font = { italic: true };
      footerRow.getCell(1).alignment = {
        vertical: "middle",
        horizontal: "right",
      };
      worksheet.mergeCells(`A${footerRow.number}:G${footerRow.number}`);

      workbook.xlsx.writeBuffer().then(resolve).catch(reject);
    } catch (error) {
      reject(error);
    }
  });
};

const generatePDF = (data, reportInfo) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40, size: "A4" });
      const buffers = [];

      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      // Letterhead: Logo, Business Name, and Contact Details
      const logoPath = path.join(__dirname, "logo.png");
      doc.image(logoPath, 40, 25, { width: 75, height: 70 });

      doc
        .font("Helvetica-Bold")
        .fontSize(20)
        .text("Tranquil Trails", 120, 35)
        .fontSize(12)
        .text("Your Own Holiday Home Away from Home", 120, 60, {
          width: 150,
          align: "left",
        });

      doc
        .fontSize(10)
        .text("Pacific Hills, Diversion,", 385, 25, {
          align: "right",
        })
        .text("Mussoorie Road, Dehradun,", 385, 40, {
          align: "right",
        })
        .text(" Uttarakhand,India. 248009 ", 385, 55, {
          align: "right",
        })
        .text("Email: care@tranquiltrails.co.in", 385, 70, { align: "right" })
        .text("Phone: +91 7673-992288", 385, 85, { align: "right" });

      doc.moveTo(40, 110).lineTo(550, 110).strokeColor("#cccccc").stroke();

      doc.moveDown(3);

      // Report Metadata Section
      doc
        .font("Helvetica-Bold")
        .fontSize(14)
        .text("Report Summary", 40, doc.y, { underline: true, align: "left" });
      doc.moveDown(1);

      const metadataDetails = [
        {
          label: "Report Date:",
          value: new Date().toLocaleDateString("en-US"),
        },
        { label: "Reporting Period:", value: reportInfo.period || "N/A" },
        { label: "Source:", value: "Website" },
        {
          label: "Total Revenue Generated:",
          value: `${reportInfo.revenueGenerated} INR`,
        },
        { label: "Total Bookings:", value: reportInfo.totalBookings || 0 },
      ];

      // Left and right column positions
      const leftColumnX = 40;
      const rightColumnX = 300;
      const rowHeight = 20; // Space between rows
      let yPosition = doc.y; // Start from the current y-position

      // Draw metadata in a grid layout
      metadataDetails.forEach(({ label, value }, index) => {
        const isLeftColumn = index % 2 === 0; // Determine if it belongs to the left column

        const currentX = isLeftColumn ? leftColumnX : rightColumnX;
        if (!isLeftColumn) {
          // If right column, ensure we're on the same row
          yPosition -= rowHeight;
        }

        if (index === 2 || index === 4) {
          yPosition += 20;
        }

        doc
          .font("Helvetica-Bold")
          .fontSize(12)
          .text(label, currentX, yPosition, { continued: true })
          .font("Helvetica")
          .text(` ${value}`, { align: "left" });

        if (isLeftColumn) {
          yPosition += rowHeight; // Move to the next row after processing left column
        }
      });

      doc.moveDown(3);

      // Table Headers
      const headers = [
        { label: "ID", width: 30 },
        { label: "Guest Name", width: 60 },
        { label: "Selected Rooms", width: 80 },
        { label: "Check-In", width: 80 },
        { label: "Check-Out", width: 80 },
        { label: "Payment (INR)", width: 80 },
      ];

      doc.font("Helvetica-Bold").fontSize(10).fillColor("#000000");

      var y = doc.y;
      headers.forEach((header, index) => {
        doc.text(header.label, 40 + index * (header.width + 10), y, {
          width: header.width,
          align: "center",
        });
      });

      doc
        .moveTo(40, y + 15)
        .lineTo(550, y + 15)
        .strokeColor("#cccccc")
        .stroke();
      doc.moveDown(1.5);

      // Table Rows
      data.forEach((booking, rowIndex) => {
        const yPosition = doc.y + 10;

        // Alternate row shading
        if (rowIndex % 2 !== 0) {
          doc
            .rect(40, yPosition, 510, 15)
            .fillOpacity(0.1)
            .fill("#f2f2f2")
            .fillOpacity(1);
        }

        const rowData = [
          booking.bookingId || "N/A",
          `${booking.firstName} ${booking.lastName}` || "N/A",
          booking.rooms.join(", ") || "N/A",
          new Date(booking.checkInDate).toLocaleDateString("en-US") || "N/A",
          new Date(booking.checkOutDate).toLocaleDateString("en-US") || "N/A",
          `${booking.totalPayment || 0} INR`,
        ];
        var y = doc.y;
        rowData.forEach((col, index) => {
          doc
            .font("Helvetica")
            .fontSize(10)
            .fillColor("#000000")
            .text(col, 40 + index * (headers[index].width + 10), y, {
              width: headers[index].width,
              align: "center",
            });
        });

        doc.moveDown(5);
      });

      // Footer
      doc
        .moveTo(40, doc.page.height - 65)
        .lineTo(550, doc.page.height - 65)
        .strokeColor("#cccccc")
        .stroke();

      doc
        .font("Helvetica")
        .fontSize(10)
        .text(
          `Generated on: ${new Date().toLocaleString("en-IN")}`,
          40,
          doc.page.height - 55,
          {
            align: "right",
          }
        );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

const exportReport = async (req, res) => {
  const { data, format, action, reportInfo } = req.body;

  try {
    if (format === "pdf") {
      const pdfBuffer = await generatePDF(data, reportInfo); // Pass both data and reportInfo to generatePDF
      if (action === "download") {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
        res.status(200).send(pdfBuffer);
      } else if (action === "email") {
        // Implement your email sending logic here
        await sendEmailWithAttachment(
          "report.pdf",
          pdfBuffer,
          "application/pdf"
        );
        res.status(200).json({ message: "Email sent successfully" });
      } else {
        res.status(400).json({ message: "Invalid action specified." });
      }
    } else if (format === "excel") {
      const excelBuffer = await generateExcel(data); // Generate Excel file
      if (action === "download") {
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=report.xlsx"
        );
        res.status(200).send(excelBuffer);
      } else if (action === "email") {
        // Implement your email sending logic here
        await sendEmailWithAttachment(
          "report.xlsx",
          excelBuffer,
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.status(200).json({ message: "Email sent successfully" });
      } else {
        res.status(400).json({ message: "Invalid action specified." });
      }
    } else {
      res.status(400).json({ message: "Unsupported format specified." });
    }
  } catch (err) {
    console.error("Error exporting report:", err);
    res.status(500).json({ message: "Failed to export report." });
  }
};

const sendEmailWithAttachment = async (filename, buffer, mimeType) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Replace with your SMTP serverfig
      port: 465, // Use 465 for secure connections
      secure: true, // Set to true if using port 465
      service: "Gmail",
      auth: {
        user: "help.tranquiltrails@gmail.com", // Replace with your email
        pass: "wtgqjmmdqrjhsojw", // Replace with your email password or an app-specific password
      },
    });

    // Email options
    const mailOptions = {
      from: '"Tranquil Trails" <help.tranquiltrails@gmail.com>', // Sender address
      to: "care@tranquiltrails.co.in", // Replace with recipient's email
      subject: "Your Requested Report",
      text: `Dear User,\n\nPlease find attached the requested report: ${filename}.\n\nBest Regards,\nTranquil Trails Team`,
      attachments: [
        {
          filename: filename,
          content: buffer,
          contentType: mimeType,
        },
      ],
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
};

// const exportReport = async (req, res) => {
//   const { data, format, action, reportInfo } = req.body;

//   try {
//     if (format === "pdf") {
//       const pdfBuffer = await generatePDF(data, reportInfo);
//       if (action === "download") {
//         res.setHeader("Content-Type", "application/pdf");
//         res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
//         res.status(200).send(pdfBuffer);
//       } else if (action === "email") {
//         // Email logic here
//         res.status(200).json({ message: "Email sent successfully" });
//       } else {
//         res.status(400).json({ message: "Invalid action specified." });
//       }
//     } else {
//       res.status(400).json({ message: "Unsupported format specified." });
//     }
//   } catch (err) {
//     console.error("Error exporting report:", err);
//     res.status(500).json({ message: "Failed to export report." });
//   }
// };

module.exports = {
  exportReport,
};
