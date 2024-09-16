const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
// const pdf = require("html-pdf");
const puppeteer = require("puppeteer");
const Booking = require("../models/Bookings");
const Room = require("../models/Room");
require("dotenv").config();

// Configure the transporter for nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Replace with your SMTP server
  port: 465, // Use 465 for secure connections
  secure: true, // Set to true if using port 465
  service: "Gmail",
  auth: {
    user: "help.tranquiltrails@gmail.com", // Replace with your email
    pass: "wtgqjmmdqrjhsojw", // Replace with your email password or an app-specific password
  },
});

var bookingConfirmationHTML = ``;

function getMonthAbbreviation(monthNumber) {
  // Define an array with month abbreviations
  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Check if the input month number is valid (1 to 12)
  if (monthNumber < 1 || monthNumber > 12) {
    return "Invalid month number"; // Return an error message for invalid input
  }

  // Return the abbreviation corresponding to the month number (1-based index)
  return monthAbbreviations[monthNumber - 1];
}

function getDayAbbreviation(dayNumber) {
  // Define an array with day abbreviations
  const dayAbbreviations = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Check if the input day number is valid (0 to 6)
  if (dayNumber < 0 || dayNumber > 6) {
    return "Invalid day number"; // Return an error message for invalid input
  }

  // Return the abbreviation corresponding to the day number
  return dayAbbreviations[dayNumber];
}

// Function to send booking confirmation email with PDF attachment
const sendBookingConfirmation = (
  customerEmail,
  adminEmail,
  bookingId,
  pdfPath
) => {
  const mailOptions = {
    from: '"Tranquil Trails" <help.tranquiltrails@gmail.com>', // Sender address
    to: `${customerEmail}, ${adminEmail}`, // Multiple recipients
    subject: "Booking Confirmation - Tranquil Trails", // Subject line
    // html: `
    //   <h1>Booking Confirmation</h1>
    //   <p>Thank you for booking with us!</p>
    //   <p>Attached is your booking confirmation.</p>
    //   <p>If you have any questions, feel free to contact us at <a href="mailto:help.tranquiltrails@gmail.com">help.tranquiltrails@gmail.com</a>.</p>
    // `,
    html: bookingConfirmationHTML,
    attachments: [
      {
        filename: `booking-confirmation-${bookingId.slice(0, 5)}.pdf`,
        path: pdfPath,
      },
    ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending booking confirmation email:", error);
      return;
    } else {
      console.log("Booking confirmation email sent:", info.response);
      // Clean up by deleting the PDF file after sending the email
      fs.unlink(pdfPath, (err) => {
        if (err) console.error("Error deleting PDF file:", err);
        else console.log("Temporary PDF file deleted.");
      });
    }
  });
};

// Function to send enquiry form entry to admin
const sendAdminEnquiryFormEntry = (enquiryDetails) => {
  const mailOptions = {
    from: '"Tranquil Trails" <help.tranquiltrails@gmail.com>', // Sender address
    to: "help.tantratech@gmail.com", // Admin recipient address
    subject: "New Enquiry Form Submission", // Subject line
    html: `
      <h1>New Enquiry Form Submission</h1>
      <p>A new enquiry has been submitted through the website.</p>
      <p>Here are the details:</p>
      <ul>
        <li><strong>Name:</strong> ${enquiryDetails.name}</li>
        <li><strong>Email:</strong> ${enquiryDetails.email}</li>
        <li><strong>Phone:</strong> ${enquiryDetails.phone}</li>
        <li><strong>Message:</strong> ${enquiryDetails.message}</li>
      </ul>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending enquiry form entry to admin:", error);
    } else {
      console.log("Enquiry form entry email sent to admin:", info.response);
    }
  });
};

const generatePDF = async (bid) => {
  console.log(bid);

  const booking = await Booking.findOne({ bookingId: bid });
  const room = await Room.findOne({ id: booking.roomId });
  const roomName = room ? room.name : "Unknown Room";

  const bookingDetails = {
    bookingId: "#" + booking.bookingId.slice(booking.bookingId.length - 5),
    checkInDate:
      getDayAbbreviation(booking.checkInDate.getDay()) +
      ", " +
      booking.checkInDate.getDate() +
      " " +
      getMonthAbbreviation(booking.checkInDate.getMonth() + 1) +
      " " +
      booking.checkInDate.getFullYear(),
    checkOutDate:
      getDayAbbreviation(booking.checkOutDate.getDay()) +
      ", " +
      booking.checkOutDate.getDate() +
      " " +
      getMonthAbbreviation(booking.checkOutDate.getMonth() + 1) +
      " " +
      booking.checkOutDate.getFullYear(),
    roomType: roomName,
    guestName: booking.firstName + " " + booking.lastName,
    email: booking.email,
    contactNumber: booking.phoneNumber,
    subTotal: booking.paymentBreakdown[0].amount,
    taxes: booking.paymentBreakdown[1].amount,
    serviceCharges: booking.paymentBreakdown[2].amount,
    totalAmount: booking.totalPayment,
  };

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlPath = path.join(__dirname, "booking_confirmation.html");
  let htmlContent = fs.readFileSync(htmlPath, "utf-8");

  // Update HTML content with booking details using string interpolation
  htmlContent = htmlContent
    .replace("bookingID", bookingDetails.bookingId)
    .replace("checkInDate", bookingDetails.checkInDate)
    .replace("checkOutDate", bookingDetails.checkOutDate)
    .replace("roomType", bookingDetails.roomType)
    .replace("guestName", bookingDetails.guestName)
    .replace("guestEmail", bookingDetails.email)
    .replace("guestContactNumber", bookingDetails.contactNumber)
    .replace("subTotal", `₹${bookingDetails.subTotal}`)
    .replace("taxesAndFees", `₹${bookingDetails.taxes}`)
    .replace("serviceCharges", `₹${bookingDetails.serviceCharges}`)
    .replace("totalAmount", `₹${bookingDetails.totalAmount}`);

  bookingConfirmationHTML = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            padding-bottom: 20px;
        }

        .header img {
            max-width: 100px;
        }

        .header h1 {
            font-size: 24px;
            color: #333333;
            margin-top: 10px;
        }

        .content {
            padding: 20px 0;
        }

        .content p {
            font-size: 16px;
            line-height: 1.5;
            color: #555555;
        }

        .booking-details {
            margin-top: 20px;
        }

        .booking-details h2 {
            font-size: 20px;
            color: #333333;
            border-bottom: 2px solid #e2e2e2;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }

        .booking-details table {
            width: 100%;
            border-collapse: collapse;
        }

        .booking-details table th,
        .booking-details table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #e2e2e2;
        }

        .booking-details table th {
            background-color: #f8f8f8;
            color: #333333;
        }

        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #999999;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 20px;
        }

        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>

<body>

    <div class="email-container">

        <!-- Header -->
        <div class="header">
            <img src="./logofull.png" alt="Company Logo">
            <h1>Booking Confirmation</h1>
        </div>

        <!-- Content -->
        <div class="content">
            <p>Dear ${bookingDetails.guestName},</p>
            <p>Thank you for your booking! We are pleased to confirm your reservation at Tranquil Trails. Please find
                your booking details below:</p>

            <!-- Booking Details -->
            <div class="booking-details">
                <h2>Booking Details</h2>
                <table>
                    <tr>
                        <th>Booking ID:</th>
                        <td>${bookingDetails.bookingId}</td>
                    </tr>
                    <tr>
                        <th>Check-in Date:</th>
                        <td>${bookingDetails.checkInDate}</td>
                    </tr>
                    <tr>
                        <th>Check-out Date:</th>
                        <td>${bookingDetails.checkOutDate}</td>
                    </tr>
                    <tr>
                        <th>Room Type:</th>
                        <td>${bookingDetails.roomType}</td>
                    </tr>
                    <tr>
                        <th>Total Amount:</th>
                        <td>₹${bookingDetails.totalAmount}</td>
                    </tr>
                </table>
            </div>

            <p>Please find your booking confirmation attached as a PDF. We look forward to welcoming you to Tranquil Trails.</p>

            <p>If you have any questions or need further assistance, feel free to contact us.</p>

            <a href="mailto:care@tranquiltrails.co.in" class="button">Contact Us</a>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>&copy; 2024 Tranquil Trails. All rights reserved.</p>
            <p>Pacific Hills, Dehradun, Uttarakhand, India | <a href="tel:+917673992288">+91 767-399-2288</a> | <a href="mailto:care@tranquiltrails.co.in">care@tranquiltrails.co.in</a></p>
        </div>
    </div>

</body>

</html>

  `;

  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  // Ensure all images are loaded before generating the PDF
  await page.evaluate(() => {
    const images = Array.from(document.images);
    return Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve, reject) => {
          img.addEventListener("load", resolve);
          img.addEventListener("error", reject);
        });
      })
    );
  });

  // Generate PDF with no margins
  await page.pdf({
    path: `booking-confirmation-${bid.slice(0, 5)}.pdf`, // Save PDF to this path
    format: "A4", // Page format
    printBackground: true, // Include background colors
    margin: {
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
    },
    preferCSSPageSize: true, // Use the CSS page size if defined
  });

  // const options = {
  //   format: "A4",
  //   orientation: "portrait", // 'portrait' or 'landscape'
  //   border: {
  //     top: "0.5in", // Default is 0, adjust as needed
  //     right: "0.5in",
  //     bottom: "0.5in",
  //     left: "0.5in",
  //   },
  //   // Adjust the following property if content still looks zoomed out
  //   zoomFactor: "1.2", // Adjust zoom factor to scale content, default is '1.0'
  // };

  // // Generate PDF from HTML content
  // await new Promise((resolve, reject) => {
  //   pdf
  //     .create(htmlContent, options)
  //     .toFile(`booking-confirmation-${bid.slice(0, 5)}.pdf`, (err, res) => {
  //       if (err) {
  //         console.log(err);
  //         reject(err); // Reject the promise if there's an error
  //       } else {
  //         console.log(
  //           "PDF generated successfully! File saved at:",
  //           res.filename
  //         );
  //         resolve(res.filename); // Resolve the promise with the filename
  //       }
  //     });
  // });
  return bookingDetails.email;
};

const BookingConfirmationEmail = async (req, res) => {
  try {
    console.log(123);
    const id = req.params.id;
    const custemail = await generatePDF(id);
    console.log(custemail);
    sendBookingConfirmation(
      custemail,
      "help.tantratech@gmail.com",
      id,
      `booking-confirmation-${id.slice(0, 5)}.pdf`
    );
    return res.status(200).send("successful");
  } catch (error) {
    return res.status(500).send(error);
  }
};

const EnquiryFormEmail = async (req, res) => {
  try {
    const { data } = req.body;
    console.log(data);
    sendAdminEnquiryFormEntry(data);
    return res.status(200).send({ message: "Successful" });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const sendOTPForForgotPassword = async (email, otp) => {
  try {
    // Generate a random 6-digit OTP

    // Send OTP to the user's email
    const mailOptions = {
      from: "help.tranquiltrails@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      html: `
        <p>Hello,</p>
        <p>You requested a password reset. Use the following OTP to reset your password:</p>
        <h3>${otp}</h3>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending OTP:", error);
    return 0;
  }
};

const sendFeedbackRequestEmail = async (email, customerName, checkoutDate) => {
  try {
    const mailOptions = {
      from: "help.tranquiltrails@gmail.com",
      to: email,
      subject: "We Value Your Feedback!",
      html: `
        <p>Dear ${customerName},</p>
        <p>We hope you enjoyed your stay with us at Tranquil Trails. We would love to hear about your experience.</p>
        <p>Your feedback is invaluable to us as it helps us improve our services and ensure that every guest has a memorable stay.</p>
        <p>Please take a moment to share your thoughts by clicking on the link below:</p>
         <p>
          <a href= ${process.env.ORIGIN}/feedback 
             style="
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #ffffff;
                background-color: #4CAF50;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 10px;
              "
          >Leave Feedback</a>
        </p>
        <p>Thank you for choosing Tranquil Trails. We look forward to welcoming you back in the future!</p>
        <p>Best Regards,</p>
        <p>Tranquil Trails Team</p>
        <p><small>Checkout Date: ${checkoutDate}</small></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Feedback request email sent to:", email);
  } catch (error) {
    console.error("Error sending feedback request email:", error);
  }
};

module.exports = {
  BookingConfirmationEmail,
  EnquiryFormEmail,
  sendFeedbackRequestEmail,
  sendOTPForForgotPassword,
};
