const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const blogRoutes = require("./routes/blogRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const { connectDb } = require("./utils/dbConnection");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    // origin: "https://pk-1624-livid.vercel.app",
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());

connectDb()
  .then(() => {
    const PORT = process.env.PORT || 4444;
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect: ", err);
  });

app.use("/api", routes);
app.use("/api", blogRoutes);
app.use("/api/payments", paymentRoutes);
