import { useDeleteCourseMutation } from '../../../redux/features/courses/coursesApi'
import { Box, Modal } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'

const DeleteCourse = ({ setOpenDeleteModal, courseId, refetch }) => {

    const [deleteCourse, { isLoading }] = useDeleteCourseMutation()

    const handleDelete = async () => {
        try {
            const res = await deleteCourse(courseId).unwrap();
            toast.success("Course deleted successfully!");
            refetch()
            setOpenDeleteModal(false)
            
        } catch (error) {
            const message = error?.data?.message || error?.message || "Something went wrong.";
            toast.error(message);
        }
    }

    return (
        <Modal open onClose={() => setOpenDeleteModal(false)} aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] outline-none border-none rounded-xl shadow-xl bg-background-green overflow-hidden">
                <div className='p-6 flex flex-col gap-5'>
                    <h4 className='font-[600]'>Are you sure you want to delete this course?</h4>
                    <div className='flex items-center justify-between'>
                        <button className='min-w-16 bg-dark-green hover:bg-muted-green text-white font-[300] py-1 px-3 rounded-sm cursor-pointer' onClick={() => setOpenDeleteModal(false)}>Cancel</button>
                        <button disabled={isLoading} className={`min-w-16 bg-red-700 ${isLoading ? "bg-gray-300 cursor-not-allowed hover:bg-gray-300" : "cursor-pointer hover:bg-red-500"} text-white font-[300] py-1 px-3 rounded-sm`} onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </Box>

        </Modal>
    )
}

export default DeleteCourse