import { ErrorHandler } from "../utils/ErrorHandler.js"
import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js"
import { userModel } from "../models/user.model.js";
import { courseModel } from "../models/course.model.js"
import { notificationModel } from "../models/notification.model.js"
import ejs from "ejs"
import path from "path"
import sendMail from "../utils/sendMail.js"; 
import { getAllOrdersService, newOrder } from "../services/order.service.js";

const _dirname = path.resolve()


export const createOrder = CatchAsyncError(async (req, res, next) => {
    try {
        const {courseId, paymentInfo} = req.body

        const user = await userModel.findById(req.user?._id)

        const courseExistInUser = user?.courses.some((course) => course._id.toString() === courseId)

        if(courseExistInUser){
            return next(new ErrorHandler("You have already purchased this course", 400))
        }
        
        const course = await courseModel.findById(courseId)
        
        if(!course){
            return next(new ErrorHandler("Course not found", 404))
            
        }

        const data = {
            courseId: course._id,
            userId: user?._id,
            paymentInfo,
        }

        course.purchasedBy.push(user._id);
        await course.save();

        const mailData = {
            order: {
                _id: course._id.toString().slice(0,6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
            }
        }

        const html = await ejs.renderFile(path.join(_dirname, './mails/order-confirmation.ejs'), {order: mailData})

        try {
            if(user){
                await sendMail({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "order-confirmation.ejs",
                    data: mailData,
                })
            }
            
        } catch (error) {
            return next(new ErrorHandler(error.message, 500))
            
        }

        user?.courses.push(course?._id)

        await user?.save()

        const notification = await notificationModel.create({
            user: user?._id,
            title: "New Order",
            message: `You have a new order from ${course?.name}`
        })

        course.purchased = course.purchased ? course.purchased + 1 : 1;


        await course.save()

        newOrder(data, res, next)


       
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

// get all orders only for admin
export const getAllOrders = CatchAsyncError(async (req, res, next) => {
    try {
        getAllOrdersService(res)
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})