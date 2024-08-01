const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDb } = require('./utils/dbConnection'); 
require('dotenv').config();
// console.log(process.env.URL);
const app = express();


app.use(cors({
    origin: "https://0.0.0.0/",
    credentials: true,
}));
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

