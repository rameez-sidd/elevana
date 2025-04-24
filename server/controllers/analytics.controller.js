import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js"
import { generateLast12MonthsData } from "../utils/analytics.generator.js"
import { ErrorHandler } from "../utils/ErrorHandler.js"
import { userModel } from "../models/user.model.js";
import { courseModel } from "../models/course.model.js";
import { orderModel } from "../models/order.model.js";


// get user analytics -- only for admin

export const getUsersAnalytics = CatchAsyncError(async (req, res, next) => {
    try {
        const users = await generateLast12MonthsData(userModel)
        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})


// get courses analytics -- only for admin
export const getCoursesAnalytics = CatchAsyncError(async (req, res, next) => {
    try {
        const courses = await generateLast12MonthsData(courseModel)
        res.status(200).json({
            success: true,
            courses
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})


// get orders analytics -- only for admin
export const getOrdersAnalytics = CatchAsyncError(async (req, res, next) => {
    try {
        const orders = await generateLast12MonthsData(orderModel)
        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})