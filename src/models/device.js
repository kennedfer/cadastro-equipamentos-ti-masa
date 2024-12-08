// src/models/Device.js
import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  qrcode: {
    type: String,
    required: false,
  },
  serviceTag: {
    type: String,
    required: true,
  },
});

const Device = mongoose.models.Device || mongoose.model('Device', deviceSchema);

export default Device;
