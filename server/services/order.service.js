import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js"
import { orderModel } from "../models/order.model.js"


// create new order
export const newOrder = CatchAsyncError(async (data, res, next) => {
    const order = await orderModel.create(data)
    res.status(201).json({
        success: true,
        order,
    })
})

 
// get all orders
export const getAllOrdersService = async(res) => {
    const orders = await orderModel.find().sort({createdAt: -1})
    res.status(200).json({
        success: true,
        orders,
    })
}
