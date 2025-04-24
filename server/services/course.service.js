import { CatchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { courseModel } from "../models/course.model.js";

// create course
export const createCourse = CatchAsyncError(async (data, res) => {
    const course = await courseModel.create(data)
    res.status(201).json({
        success: true,
        course
    })
})

// get all courses
export const getAllCoursesService = async(res, userId) => {
    const courses = await courseModel.find({ createdBy: userId }).sort({createdAt: -1})
    res.status(200).json({
        success: true,
        courses,
    })
}