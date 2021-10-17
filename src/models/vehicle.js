let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let VehicleSchema = new Schema(
  {
    plate: { type: String, required: true },
    chassis: { type: String, required: true },
    renavam: { type: String, required: true },
    model: { type: String, required: true },
    brand: { type: String, required: true },
    year: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false
  }
);

VehicleSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('vehicle', VehicleSchema);