const express = require("express");
const bodyParser = require("body-parser");
const { authenticateAdmin } = require("./controller/authenticateAdmin");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

app.post("/authenticateAdmin", authenticateAdmin);
