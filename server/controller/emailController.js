const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const pdf = require("html-pdf");
const Booking = require("../models/Bookings");
const Room = require("../models/Room");

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
    html: `
      <h1>Booking Confirmation</h1>
      <p>Thank you for booking with us!</p>
      <p>Attached is your booking confirmation.</p>
      <p>If you have any questions, feel free to contact us at <a href="mailto:help.tranquiltrails@gmail.com">help.tranquiltrails@gmail.com</a>.</p>
    `,
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
const sendAdminEnquiryFormEntry = (adminEmail, enquiryDetails) => {
  const mailOptions = {
    from: '"Tranquil Trails" <your-email@example.com>', // Sender address
    to: adminEmail, // Admin recipient address
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
    subTotal: booking.totalPayment - 50,
    taxes: 50,
    totalAmount: booking.totalPayment,
  };

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
    .replace("totalAmount", `₹${bookingDetails.totalAmount}`);

  const options = {
    format: "A4",
    orientation: "portrait", // 'portrait' or 'landscape'
    border: {
      top: "0.5in", // Default is 0, adjust as needed
      right: "0.5in",
      bottom: "0.5in",
      left: "0.5in",
    },
    // Adjust the following property if content still looks zoomed out
    zoomFactor: "1.2", // Adjust zoom factor to scale content, default is '1.0'
  };

  // Generate PDF from HTML content
  await new Promise((resolve, reject) => {
    pdf
      .create(htmlContent, options)
      .toFile(`booking-confirmation-${bid.slice(0, 5)}.pdf`, (err, res) => {
        if (err) {
          console.log(err);
          reject(err); // Reject the promise if there's an error
        } else {
          console.log(
            "PDF generated successfully! File saved at:",
            res.filename
          );
          resolve(res.filename); // Resolve the promise with the filename
        }
      });
  });
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

module.exports = {
  BookingConfirmationEmail,
};
