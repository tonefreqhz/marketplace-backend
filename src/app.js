// import dependencies
import "babel-polyfill";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// import routes
import api from "./api";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

const PORT = process.env.PORT || 5000;
const DB_HOST = process.env.DB_HOST_TEST || "mongodb://localhost:27017/marketplace";

// Configuring the database
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Successfully connected to the database!");
  }).catch((err) => {
    console.log(err, "Could not connect to the database. Exiting now...");
    process.exit();
  });


// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to BezopShop application." });
});

// Use Routes
app.use("/api/v1", api);

app.use((req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
  next();
});

// listen for requests
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
