const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
}));

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

//Example with route params
app.get("/user/:name", (req, res, next) => {
  const { name } = req.params;
  res.cookie("testCookie", name, {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    maxAge: 3600000, // 1 hour
  });
  return res.status(200).json({
    message: `${name} is the name you provided!`,
  });
});

//Example with query params
app.get("/user", (req, res, next) => {
  const { name } = req.query;
  res.cookie("testCookie", name, {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    maxAge: 3600000, // 1 hour
  });
  return res.status(200).json({
    message: `${name} is the name you provided!`,
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
