import { Area, AreaChart, CartesianGrid, Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from '../../../redux/features/analytics/analyticsApi'
import React, { useEffect, useState } from 'react'
import { AiOutlineProduct } from "react-icons/ai";
import { PiUsersThree } from "react-icons/pi";
import { Box, CircularProgress } from '@mui/material';
import Invoices from '../Invoices/Invoices';
import Loading from '../../../components/Loading';

const DashboardContainer = () => {

    const [ordersComparePercentage, setOrdersComparePercentage] = useState();
    const [userComparePercentage, setuserComparePercentage] = useState();

    const { data: userData, isLoading: isUsersLoading } = useGetUsersAnalyticsQuery({})
    const { data: ordersData, isLoading: isOrdersLoading } = useGetOrdersAnalyticsQuery({})

    useEffect(() => {
        if (isUsersLoading && isOrdersLoading) {
            return;
        } else {
            if (userData && ordersData) {
                const usersLastTwoMonths = userData.users.last12Months.slice(-2)
                const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2)

                if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths.length === 2) {
                    const usersCurrentMonth = usersLastTwoMonths[1].count
                    const usersPreviousMonth = usersLastTwoMonths[0].count
                    const ordersCurrentMonth = ordersLastTwoMonths[1].count
                    const ordersPreviousMonth = ordersLastTwoMonths[0].count

                    const usersPercentChange = usersPreviousMonth !== 0 ? ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) * 100 : 100

                    const ordersPercentChange = ordersPreviousMonth !== 0 ? ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) * 100 : 100;

                    setuserComparePercentage({
                        currentMonth: usersCurrentMonth,
                        previousMonth: usersPreviousMonth,
                        percentChange: usersPercentChange,
                    })

                    setOrdersComparePercentage({
                        currentMonth: ordersCurrentMonth,
                        previousMonth: ordersPreviousMonth,
                        percentChange: ordersPercentChange,
                    })
                }
            }
        }
    }, [isOrdersLoading, isUsersLoading, userData, ordersData])


    const usersAnalyticsData = []

    userData && userData?.users?.last12Months.forEach((item) => {
        usersAnalyticsData.push({ name: item.month.split(' ').slice(1).join(' '), users: item.count })
    })




    const ordersAnalyticsData = []

    ordersData && ordersData?.orders?.last12Months.forEach((item) => {
        ordersAnalyticsData.push({ name: item.month.split(' ').slice(1).join(' '), orders: item.count })
    })



    return (
        <div className='px-8 py-8'>
            <div className='flex flex-col gap-8'>
                <div className='grid grid-cols-4'>
                    <div className='h-[300px] bg-zinc-200 rounded-sm pt-3 col-span-3'>
                        <h2 className='font-[600] text-center'>Users Analytics</h2>
                        <div className='h-full flex items-end'>
                            {
                                isUsersLoading ? (
                                    <Loading size='full' />
                                ) : (
                                    <ResponsiveContainer height="90%" >
                                        <AreaChart data={usersAnalyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                                            <XAxis dataKey="name" interval={0} dy={10} style={{ fontSize: '10px' }} />

                                            <YAxis style={{ fontSize: '10px' }}>
                                                <Label
                                                    value="Unique Users Purchased"
                                                    angle={-90}
                                                    position="insideLeft"
                                                    style={{ textAnchor: 'middle', fontSize: 12 }}
                                                />
                                            </YAxis>
                                            <Tooltip />
                                            <Area dataKey="users" type="monotone" stroke="#163d3b" fill="#A6B89E" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                )
                            }

                        </div>
                    </div>

                    <div className='col-span-1 pl-8 flex flex-col justify-evenly'>
                        <div className='flex justify-between bg-zinc-200 rounded-sm p-4'>
                            <div className='flex flex-col gap-0'>
                                <AiOutlineProduct size={28} className='text-sky-700' />
                                <p className='text-2xl font-[600] mt-4'>{ordersComparePercentage ? ordersComparePercentage?.currentMonth : "0"}</p>
                                <p>Orders Placed</p>
                            </div>
                            <div className='flex justify-center items-center flex-col gap-2'>
                                <Box className="flex items-center flex-col gap-2">
                                    <CircularProgress variant="determinate" value={ordersComparePercentage ? ordersComparePercentage?.percentChange > 0 ? 100 : 0 : 10} size={45} color="primary" thickness={8} />
                                        {
                                            ordersComparePercentage ? (
                                                <p>{ordersComparePercentage?.percentChange > 0 ? "+" + ordersComparePercentage?.percentChange.toFixed(2) : "-" + ordersComparePercentage?.percentChange.toFixed(2)} %</p>

                                            ) : (
                                                <p>+0.00 %</p>
                                            )
                                        }
                                </Box>
                            </div>
                        </div>
                        <div className='flex justify-between bg-zinc-200 rounded-sm p-4'>
                            <div className='flex flex-col gap-0'>
                                <PiUsersThree size={28} className='text-sky-700' />
                                <p className='text-2xl font-[600] mt-4'>{userComparePercentage ? userComparePercentage?.currentMonth : "0"}</p>
                                <p>Users Enrolled</p>
                            </div>
                            <div className='flex justify-center items-center flex-col gap-2'>
                                <Box className="flex items-center flex-col gap-2">
                                    <CircularProgress variant="determinate" value={userComparePercentage ? userComparePercentage?.percentChange > 0 ? 100 : 0 : 10} size={45} color="primary" thickness={8} />
                                        {
                                            userComparePercentage ? (
                                                <p>{userComparePercentage?.percentChange > 0 ? "+" + userComparePercentage?.percentChange.toFixed(2)  : "-" + userComparePercentage?.percentChange.toFixed(2)} %</p>

                                            ) : (
                                                <p>+0.00 %</p>
                                            )
                                        }
                                </Box>
                            </div>
                        </div>
                    </div>



                </div>

                <div className='grid grid-cols-5 '>
                    <div className='col-span-2 flex flex-col gap-2 pr-8 self-center '>
                        <h5 className='font-[600]'>Recent Transactions</h5>
                        <Invoices /> 

                    </div>

                    <div className='h-[300px] bg-zinc-200 rounded-sm pt-3 col-span-3'>
                        <h2 className='font-[600] text-center'>Orders Analytics</h2>
                        <div className='h-full flex items-end'>
                            {
                                isOrdersLoading ? (
                                    <Loading size='full'/>
                                ) : (
                                    <ResponsiveContainer height="90%" >
                                        <LineChart data={ordersAnalyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" angle={-45} interval={0} dy={10} style={{ fontSize: '10px' }} />
                                            <YAxis style={{ fontSize: '10px' }}>
                                                <Label
                                                    value="Orders Placed"
                                                    angle={-90}
                                                    position="insideLeft"
                                                    style={{ textAnchor: 'middle', fontSize: 12 }}
                                                />
                                            </YAxis>
                                            <Tooltip />
                                            <Line type="monotone" dataKey="orders" stroke="#163d3b" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DashboardContainer