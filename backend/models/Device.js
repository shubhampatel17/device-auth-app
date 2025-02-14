const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true },
  lastAuthenticated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Device", DeviceSchema);
