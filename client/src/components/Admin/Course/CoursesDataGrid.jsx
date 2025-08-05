import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material'
import { AiFillDelete } from 'react-icons/ai'
import { RiEditBoxFill } from "react-icons/ri";
import Loading from '../../../components/Loading';
import { format } from 'timeago.js';
import DeleteCourse from './DeleteCourse';
import { useGetAllCoursesQuery } from '../../../redux/features/courses/coursesApi';
import useGetCourseForEdit from '../../../hooks/useGetCourseForEdit';
import { MdQuestionAnswer } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const CoursesDataGrid = () => {
    const {data, isLoading, error, refetch, isSuccess} = useGetAllCoursesQuery(undefined, {refetchOnFocus: true, refetchOnMountOrArgChange: true, refetchOnReconnect: true})
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [courseIdToDelete, setCourseIdToDelete] = useState("")
    const [courseIdToEdit, setCourseIdToEdit] = useState("")
    const navigate = useNavigate()
    
    // Using our new custom hook
    const { loading: editLoading } = useGetCourseForEdit(courseIdToEdit);
    
    useEffect(() => {
        refetch()
    }, [])

    const columns = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "title", headerName: "Course Title", flex: 1 },
        { field: "ratings", headerName: "Ratings", flex: 0.5 },
        { field: "purchased", headerName: "Purchased", flex: 0.5 },
        { field: "created_at", headerName: "Created At", flex: 0.5 },
        { field: "   ", headerName: "Q/A", flex: 0.4, renderCell: (params) => { return (<Button onClick={() => navigate(`/admin/admin-dashboard/course-qa/${params.row.id}`)}><MdQuestionAnswer size={17} className='text-dark-green' /></Button>) } },
        { field: " ", headerName: "Edit", flex: 0.4, renderCell: (params) => { return (<Button onClick={() => handleEdit(params.row.id)}><RiEditBoxFill size={17} className='text-dark-green' /></Button>) } },
        { field: "  ", headerName: "Delete", flex: 0.4, renderCell: (params) => { return (<Button onClick={() => {
            setOpenDeleteModal(true)
            setCourseIdToDelete(params.row.id)
        }}><AiFillDelete size={17} className='text-dark-green' /></Button>) } },
    ]

    const rows = []

    {
        data && data?.courses?.forEach((item) => (
            rows.push({
                id: item._id,
                title: item.name,
                ratings: item.ratings,
                purchased: item.purchased,
                created_at: format(item.createdAt),
            })
        ))
    }

    const handleEdit = (id) => {
        setCourseIdToEdit(id)
    }


    return (
        <div className='px-12 py-12'>
            {
                isLoading ? (
                    <Loading size='screen'/>
                ) : (
                    <Box>
                        <DataGrid checkboxSelection rows={rows} columns={columns} rowHeight={37} pagination pageSize={1} rowsPerPageOptions={[10, 25, 50]}
                            sx={{
                                fontFamily: `"Lexend", sans-serif`,
                                fontSize: '13px',
                                border: '1px solid #d1d5db',
                                height: 500,

                                "& .MuiDataGrid-columnHeader": {
                                    backgroundColor: 'transparent'
                                },
                                '& .css-yseucu-MuiDataGrid-columnHeaderRow': {
                                    backgroundColor: '#163d3b !important',
                                    height: '42px !important',
                                    color: 'white'
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'white'
                                },
                                '& input[name="select_all_rows"] + .MuiSvgIcon-root': {
                                    color: 'white'
                                },
                                '& input[name="select_row"] + .MuiSvgIcon-root': {
                                    color: 'black !important',
                                },


                                '& .MuiTablePagination-selectIcon': {
                                    color: 'black'
                                },
                                '& .MuiSvgIcon-root[data-testid="KeyboardArrowLeftIcon"]': {
                                    color: 'black'
                                },
                                '& .MuiSvgIcon-root[data-testid="KeyboardArrowRightIcon"]': {
                                    color: 'black'
                                },
                                '& .MuiDataGrid-row': {
                                    minHeight: 30,
                                    maxHeight: 30,
                                },
                                "& .MuiDataGrid-columnHeaderTitle": {
                                    fontWeight: '400',
                                    fontSize: '14px'
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    backgroundColor: '#dce7d8',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    borderTop: '1px solid #ddd',
                                },
                                '& .MuiTablePagination-displayedRows': {
                                    fontFamily: `"Lexend", sans-serif`,
                                },
                                '& .MuiTablePagination-selectLabel': {
                                    fontFamily: `"Lexend", sans-serif`,
                                },
                                '& .css-mmygx2-MuiSelect-select-MuiInputBase-input': {
                                    fontFamily: `"Lexend", sans-serif`,

                                },
                                '& .MuiDataGrid-columnSeparator': {
                                    opacity: 0,
                                }

                            }} />
                    </Box>
                )
            }

            {
                openDeleteModal && (
                    <DeleteCourse setOpenDeleteModal={setOpenDeleteModal} courseId={courseIdToDelete} refetch={refetch}/>
                )
            }

        </div>
    )
}

export default CoursesDataGrid