import Stripe from "stripe";
import { courseModel } from "../models/course.model";
import { coursePurchase } from "../models/course-purchase.model";
import { createOrder } from "./order.controller";
import { userModel } from "../models/user.model";
import { redis } from "../utils/redis";
import { notificationModel } from "../models/notification.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createCheckoutSession = CatchAsyncError(async (req, res, next) => {
    try {
        const userId = req.user?._id
        const { courseId } = req.body

        const course = await courseModel.findById(courseId)
        if (!course) {
            return next(new ErrorHandler("Course not found", 404))
        }

        // Create a new course purchase record
        const newPurchase = new coursePurchase({
            courseId,
            userId,
            amount: course?.price,
            status: 'pending',
        })

        // Create a stripe checkout session
        const session = stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: course?.name,
                            images: [course?.thumbnail?.url],

                        },
                        unit_amount: course?.price
                    },
                    quantity: 1,
                }
            ],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/course-access/${courseId}`,
            cancel_url: `${process.env.FRONTEND_URL}/course/${courseId}`,
            metadata: {
                courseId: courseId,
                userId: userId,
            },
            shipping_address_collection: {
                allowed_countries: ["IN", "US"]
            }
        })

        if (!session.url) {
            return res.status(400).json({
                success: false,
                message: 'Error while creating session!'
            })
        }

        newPurchase.paymentId = session.id
        await newPurchase.save()

        return res.status(200).json({
            success: true,
            url: session.url
        })



    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

export const stripWebhook = CatchAsyncError(async (req, res, next) => {
    let event
    try {
        const payloadString = JSON.stringify(req.body, null, 2)
        const secret = process.env.WEBHOOK_ENDPOINT_SECRET

        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret
        })
        event = stripe.webhooks.constructEvent(payloadString, header, secret)
    } catch (error) {
        console.error("Webhook error: ", error.message)
        return res.status(400).send(`Webhook error: ${error.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        try {
            const session = event.data.object

            const purchase = await coursePurchase.findOne({
                paymentId: session.id,

            }).populate({ path: "courseId" })

            if (!purchase) {
                return res.status(404).json({
                    message: "Purchase not found"
                })
            }

            if (session.amount_total) {
                purchase.amount = session.amount_total
            }
            purchase.status = 'completed'

            const user = await userModel.findById(req.user?._id)

            const courseExistInUser = user?.courses.some((course) => course._id.toString() === purchase.courseId)

            if (courseExistInUser) {
                return next(new ErrorHandler("You have already purchased this course", 400))
            }

            const course = await courseModel.findById(purchase.courseId)

            if (!course) {
                return next(new ErrorHandler("Course not found", 404))

            }

            const data = {
                courseId: course._id,
                userId: user?._id,
                paymentInfo,
            }


            const mailData = {
                order: {
                    _id: course._id.toString().slice(0, 6),
                    name: course.name,
                    price: course.price,
                    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                }
            }

            const html = await ejs.renderFile(path.join(_dirname, './mails/order-confirmation.ejs'), { order: mailData })

            try {
                if (user) {
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

            await redis.set(req.user?._id, JSON.stringify(user))

            await user?.save()

            const notification = await notificationModel.create({
                user: user?._id,
                title: "New Order",
                message: `You have a new order from ${course?.name}`,
                adminId: course.createdBy
            })

            course.purchased = course.purchased ? course.purchased + 1 : 1;


            course.purchasedBy.push(user._id);
            await redis.set(courseId, JSON.stringify(course))
            await course.save()

            const courses = await courseModel.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links").sort({ createdAt: -1 })

            await redis.set("allCourses", JSON.stringify(courses))

            // Update enrolled courses cache for the user
            const enrolledCourses = await courseModel.find({
                _id: { $in: user.courses }
            }).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links").sort({ createdAt: -1 });

            await redis.set(`enrolledCourses:${user._id}`, JSON.stringify(enrolledCourses), "EX", 604800); // Cache for 7 days

            newOrder(data, res, next)
        } catch (error) {

        }
    }
});