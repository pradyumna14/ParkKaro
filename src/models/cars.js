const mongoose = require('mongoose');
// const carData = require('./car_data.json');
const carSchema = new mongoose.Schema({
  maker: {
    type: String,
    required: true,
    unique: true
  },
  models: [
    {
      model_name: {
        type: String,
        required: true,
        unique: true
      },
      year: {
        type: Number,
      },
      dimensions: {
        length_mm: {
          type: Number,
          required: true
        },
        width_mm: {
          type: Number,
          required: true
        },
        height_mm: {
          type: Number
        }
      }
    }
  ]
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;