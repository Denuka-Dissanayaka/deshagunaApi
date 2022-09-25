const mongoose = require("mongoose");


const recordShema = new mongoose.Schema(
  {
    record: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      
    }
  },
  {
    timestamps: true
  }
);


const Record = mongoose.model('Record', recordShema);

module.exports = Record;