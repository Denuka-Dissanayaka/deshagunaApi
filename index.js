const express = require("express");
const {initializeDbConnection} = require('./db')
//const mongoose = require("mongoose");
//const cors = require("cors");
require("dotenv").config();
const app = express();

//app.use(cors());

const userRoutes = require('./routes/user');
const recordRoutes = require('./routes/record');

// mongoose
//   .connect(process.env.DATABASE_URL)
//   .then(() => {
//     console.log("Database connected");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });


initializeDbConnection()
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    })


app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*"); 
  res.set("Access-Control-Allow-Headers", "*");
  res.set("Access-Control-Allow-Methods", "*");
  if (res.method == "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/records', recordRoutes);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server started port ${PORT}`);
});
