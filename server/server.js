const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const blogRoutes = require("./routes/blogRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const globalSettingsRoutes = require("./routes/globalSettingsRoutes");
const { connectDb } = require("./utils/dbConnection");
const cors = require("cors");
require("dotenv").config();

const app = express();
console.log(process.env.ORIGIN);
app.use(
  cors({
    // origin: "https://pk-1624-livid.vercel.app",
    origin: process.env.ORIGIN,
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
app.use("/api", newsletterRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api", globalSettingsRoutes);
