import { format } from 'timeago.js';
import React, { useEffect } from 'react'
import Loading from '../../../components/Loading';
import { DataGrid } from '@mui/x-data-grid';

import { Box, Button } from '@mui/material'
import { AiFillDelete, AiFillMail } from 'react-icons/ai'
import { useGetAllUsersQuery } from '../../../redux/features/user/userApi';

const StudentsDataGrid = () => {
    const { data, isLoading, error, refetch, isSuccess } = useGetAllUsersQuery(undefined, { refetchOnFocus: true, refetchOnMountOrArgChange: true, refetchOnReconnect: true })


    useEffect(() => {
        refetch()
    }, [] )


    const columns = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "name", headerName: "Name", flex: 0.5 },
        { field: "email", headerName: "Email", flex: 0.6 },
        { field: "role", headerName: "Role", flex: 0.3 },
        { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
        { field: "created_at", headerName: "Joined At", flex: 0.4 },
        { field: "  ", headerName: "Email", flex: 0.3, renderCell: (params) => { return (<Button><a href={`mailto:${params.row.email}`} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><AiFillMail size={17} className='text-dark-green' /></a></Button>) } },

    ]

    const rows = []


    {
        data && data?.users?.forEach((item) => (
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role === 'admin' ? 'educator' : item.role,
                courses: item.purchasedCourses.length,
                created_at: format(item.createdAt),

            })
        ))
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
                                border: 'none',
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

        </div>
    )
}

export default StudentsDataGrid