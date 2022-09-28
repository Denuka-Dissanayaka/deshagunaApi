const mongoose = require("mongoose");


const userShema = new mongoose.Schema(
  {
 
    timestamp_property: {
      type: Date,
      default: new Date()
    },
    records : {
        type: String,
        default: 0
    }
   
  },
  {
    timeseries: {
      timeField: 'timestamp_property',
      granularity: 'minutes',
    },
  }
);


const userEmail = new mongoose.Schema({
  email: {
    type:String,
    required:true
  },
  name: {
    type: String,
    required: true,
  },
  image : {
    type: String
  }
})


const User = mongoose.model('User', userEmail);

module.exports = {userShema, User} ;