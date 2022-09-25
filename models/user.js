const mongoose = require("mongoose");


const userShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    records : {
        type: Number,
        default: 0
    },
    image : {
        type: String
    }
    
  },
  {
    timestamps: true
  }
);


const User = mongoose.model('User', userShema);

module.exports = User;