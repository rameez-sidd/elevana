import { apiSlice } from "../../api/apiSlice";

export const courseProgressApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourseProgress: builder.query({
            query: (courseId) => ({
                url: `${courseId}`,
                method: 'GET',
                credentials: 'include'
            })
        }),
        updateLectureProgress: builder.mutation({
            query: ({ courseId, lectureId }) => ({
                url: `${courseId}/lecture/${lectureId}/view`,
                method: 'POST',
                credentials: 'include'
            })
        }),
        completeCourse: builder.mutation({
            query: (courseId) => ({
                url: `${courseId}/complete`,
                method: 'POST',
                credentials: 'include'
            })
        }),
        incompleteCourse: builder.mutation({
            query: (courseId) => ({
                url: `${courseId}/incomplete`,
                method: 'POST',
                credentials: 'include'
            })
        }),
    })
})



export const { useGetCourseProgressQuery, useCompleteCourseMutation, useIncompleteCourseMutation, useUpdateLectureProgressMutation  } = courseProgressApi