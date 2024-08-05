const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PackageSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Package = mongoose.model("Package", PackageSchema);

module.exports = Package;
