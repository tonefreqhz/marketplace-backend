// import dependencies
import "babel-polyfill";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

// import routes
import 	adminRoute from "./routes/adminRoute";
import 	permissionRoute from "./routes/permissionRoute";
import 	roleRoute from "./routes/roleRoute";
import 	customerRoute from "./routes/customerRoute";
import 	vendorRoute from "./routes/vendorRoute";
import 	arbitrationRoute from "./routes/arbitrationRoute";
import 	blogRoute from "./routes/blogRoute";
import 	messageRoute from "./routes/messageRoute";
import 	subscribeRoute from "./routes/subscribeRoute";
import 	reviewRoute from "./routes/reviewRoute";
import 	couponRoute from "./routes/couponRoute";
import 	productRoute from "./routes/productRoute";
import 	productExtraRoute from "./routes/productExtraRoute";
import 	categoryRoute from "./routes/categoryRoute";
import 	brandRoute from "./routes/brandRoute";
import 	stockRoute from "./routes/stockRoute";
import 	orderRoute from "./routes/orderRoute";
import 	mediaRoute from "./routes/mediaRoute";
import 	sliderRoute from "./routes/sliderRoute";
import 	currencyRoute from "./routes/currencyRoute";
import 	settingRoute from "./routes/settingRoute";
import 	languageRoute from "./routes/languageRoute";
import 	languageListRoute from "./routes/languageListRoute";
import 	mailRoute from "./routes/mailRoute";
import 	templateRoute from "./routes/templateRoute";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;
const DB_HOST = process.env.DB_HOST || "mongodb://localhost:27017/marketplace";

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

// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to BezopShop application." });
});

// Use Routes
app.use("/api/v1", adminRoute);
app.use("/api/v1", permissionRoute);
app.use("/api/v1", roleRoute);
app.use("/api/v1", customerRoute);
app.use("/api/v1", vendorRoute);
app.use("/api/v1", arbitrationRoute);
app.use("/api/v1", blogRoute);
app.use("/api/v1", messageRoute);
app.use("/api/v1", subscribeRoute);
app.use("/api/v1", reviewRoute);
app.use("/api/v1", couponRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", productExtraRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", brandRoute);
app.use("/api/v1", stockRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", mediaRoute);
app.use("/api/v1", sliderRoute);
app.use("/api/v1", currencyRoute);
app.use("/api/v1", settingRoute);
app.use("/api/v1", languageRoute);
app.use("/api/v1", languageListRoute);
app.use("/api/v1", mailRoute);
app.use("/api/v1", templateRoute);

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
