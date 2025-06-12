// Init Database
require('./db/dynamooseClient');

const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router/router");
//Load models
require('./models');


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
}));


//Sample to test if cookies are working
app.get("/", (req, res, next) => {
  res.cookie("testCookie", "testValue", {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    maxAge: 3600000, // 1 hour
  });
  return res.status(200).json({
    message: "Hello from root!",
  });
});

//All routes are handled from the router
app.use("/", router)


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


exports.handler = serverless(app);
