import express from "express"
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";
import { createOrder, getAllOrders } from "../controllers/order.controller.js";
import { updateAccessToken } from "../controllers/user.controller.js";

const orderRouter = express.Router();

orderRouter.post('/create-order', updateAccessToken, isAuthenticated, createOrder)
orderRouter.get('/get-orders', updateAccessToken, isAuthenticated, authorizeRoles("admin"), getAllOrders)

export default orderRouter
