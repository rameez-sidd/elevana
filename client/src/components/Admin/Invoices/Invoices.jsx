import { useGetAllOrdersQuery } from '../../../redux/features/orders/ordersApi'
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import Loading from '../../../components/Loading'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const Invoices = () => {
    const { data, isLoading, refetch } = useGetAllOrdersQuery(undefined, { refetchOnFocus: true, refetchOnMountOrArgChange: true, refetchOnReconnect: true })

    useEffect(() => {
        refetch()
    }, [])

    const columns = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "name", headerName: "Name", flex: 0.5 },
        { field: "price", headerName: "Price", flex: 0.5 },
        { field: "created_at", headerName: "Placed At", flex: 0.5 }

    ]

    const rows = []

    
    data && data?.orders.slice(0, 6).forEach((item) => {
        rows.push({
            id: item._id,
            name: item.user.name,
            price: `₹${item.course.price}`,
            created_at: format(item.createdAt)
        })
    })

    return (
        <div className=''>
            {
                isLoading ? (
                    <Loading size='full' />
                ) : (
                    <Box>
                        <DataGrid rows={rows} columns={columns} rowHeight={37} pagination pageSize={1} rowsPerPageOptions={[10, 25, 50]}
                            sx={{
                                fontFamily: `"Lexend", sans-serif`,
                                fontSize: '13px',
                                border: 'none',
                                maxHeight: 250,

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
                                    fontSize: '12px'
                                },
                                '& .MuiTablePagination-selectLabel': {
                                    fontFamily: `"Lexend", sans-serif`,
                                    fontSize: '12px'
                                },
                                '& .css-mmygx2-MuiSelect-select-MuiInputBase-input': {
                                    fontFamily: `"Lexend", sans-serif`,
                                    fontSize: '12px'

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

export default Invoices