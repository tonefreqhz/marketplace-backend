import express from "express";

import auth from "./auth";
import 	adminRoute from "./admin";
import 	customerRoute from "./customer";
import 	vendorRoute from "./vendor";
import 	arbitrationRoute from "./arbitration";
import 	blogRoute from "./blog";
import 	messageRoute from "./message";
import 	subscriberRoute from "./subscriber";
import 	reviewRoute from "./review";
import 	couponRoute from "./coupon";
import 	productRoute from "./product";
import 	categoryRoute from "./category";
import 	brandRoute from "./brand";
import 	stockRoute from "./stock";
import 	orderRoute from "./order";
import 	mediaRoute from "./media";
import 	sliderRoute from "./slider";
import 	currencyRoute from "./currency";
import 	settingRoute from "./setting";
import 	languageRoute from "./language";
import 	languageListRoute from "./languageList";
import 	mailRoute from "./mail";
import 	templateRoute from "./template";
import 	ticketRoute from "./ticket";

const router = express.Router();

// Use Routes
router.use(auth);
router.use(adminRoute);
router.use(customerRoute);
router.use(vendorRoute);
router.use(arbitrationRoute);
router.use(blogRoute);
router.use(messageRoute);
router.use(subscriberRoute);
router.use(reviewRoute);
router.use(couponRoute);
router.use(productRoute);
router.use(categoryRoute);
router.use(brandRoute);
router.use(stockRoute);
router.use(orderRoute);
router.use(mediaRoute);
router.use(sliderRoute);
router.use(currencyRoute);
router.use(settingRoute);
router.use(languageRoute);
router.use(languageListRoute);
router.use(mailRoute);
router.use(templateRoute);
router.use(ticketRoute);

export default router;
