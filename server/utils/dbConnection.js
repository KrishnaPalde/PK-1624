const mongoose = require('mongoose');
require('dotenv').config();
const URL = process.env.URL;


let dbConn;

const connectDb = async () => {
  try {
    await mongoose.connect(URL);
    dbConn = mongoose.connection;
    console.log('MongoDB Connected!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error; 
  }
};


module.exports = { connectDb };