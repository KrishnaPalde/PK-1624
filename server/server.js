const express = require("express");
const bodyParser = require("body-parser");
const authRoute = require("./routes/routes");
const { connectDb } = require("./utils/dbConnection");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());

connectDb()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect: ", err);
  });

app.use("/api", authRoute);
