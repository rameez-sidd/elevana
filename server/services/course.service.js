import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { courseModel } from "../models/course.model.js";
import { redis } from "../utils/redis.js";

// create course
export const createCourse = CatchAsyncError(async (data, res) => {
    const course = await courseModel.create(data)
    const courses = await courseModel.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links")

    await redis.set("allCourses", JSON.stringify(courses))
    res.status(201).json({
        success: true,
        course
    })
})

// get all courses
export const getAllCoursesService = async (res, userId) => {
    const courses = await courseModel.find({ createdBy: userId }).sort({ createdAt: -1 })
    res.status(200).json({
        success: true,
        courses,
    })
}