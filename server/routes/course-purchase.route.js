import express from "express"
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";
import { updateAccessToken } from "../controllers/user.controller.js";
import { createCheckoutSession, stripWebhook } from "../controllers/course-purchase.controller.js";

const coursePurchaseRouter = express.Router();

coursePurchaseRouter.post('/checkout/create-checkout-session', updateAccessToken, isAuthenticated, createCheckoutSession)
coursePurchaseRouter.post('/webhook', express.raw({type: 'application/json'}), stripWebhook)


export default coursePurchaseRouter
