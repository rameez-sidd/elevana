import { apiSlice } from "../../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query:(data) => ({
                url: 'create-course',
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        }),
        getAllCourses: builder.query({
            query:() => ({
                url: 'get-all-courses',
                method: 'GET',
                credentials: 'include'
            })
        }),
        deleteCourse: builder.mutation({
            query:(id) => ({
                url: `delete-course/${id}`,
                method: 'DELETE',
                credentials: 'include'
            })
        }),
        getCourseForEdit: builder.query({
            query:(id) => ({
                url: `get-course-for-edit/${id}`,
                method: 'GET',
                credentials: 'include'
            })
        }),
        editCourse: builder.mutation({
            query:({id, data}) => ({
                url: `edit-course/${id}`,
                method: 'PUT',
                body: data,
                credentials: 'include'
            })
        }),
        getCourses: builder.query({
            query:() => ({
                url: `get-courses`,
                method: 'GET',
                credentials: 'include'
            })
        }),
        getCourseDetails: builder.query({
            query:(id) => ({
                url: `get-course/${id}`,
                method: 'GET',
                credentials: 'include'
            })
        }),
        getCourseContent: builder.query({
            query: (id) => ({
                url: `get-course-content/${id}`,
                method: 'GET',
                credentials: 'include'
            })
        }),
        getEnrolledCourses: builder.query({
            query: () => ({
                url: 'get-enrolled-courses',
                method: 'GET',
                credentials: 'include'
            })
        }),
        addNewQuestion: builder.mutation({
            query: ({question, courseId, contentId}) => ({
                url: 'add-question',
                body: {
                    question, 
                    courseId, 
                    contentId
                },
                method: 'PUT',
                credentials: 'include'
            })
        }),
        addAnswerinQuestion: builder.mutation({
            query: ({answer, courseId, contentId, questionId}) => ({
                url: 'add-answer',
                body: {
                    answer, 
                    courseId, 
                    contentId,
                    questionId
                },
                method: 'PUT',
                credentials: 'include'
            })
        }),
        addReviewinCourse: builder.mutation({
            query: ({ review, rating, courseId }) => ({
                url: `add-review/${courseId}`,
                body: { review, rating },
                method: 'PUT',
                credentials: 'include'
            })
        })

    })
})



export const { useCreateCourseMutation, useGetAllCoursesQuery, useDeleteCourseMutation, useGetCourseForEditQuery, useEditCourseMutation, useGetCoursesQuery, useGetCourseDetailsQuery, useGetCourseContentQuery, useAddNewQuestionMutation, useAddAnswerinQuestionMutation, useAddReviewinCourseMutation, useGetEnrolledCoursesQuery } = courseApi