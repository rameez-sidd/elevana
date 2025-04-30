import { Bar, CartesianGrid, Label, LabelList, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Loading from '../../../Loading'
import { useGetOrdersAnalyticsQuery } from '../../../../redux/features/analytics/analyticsApi'
import React from 'react'



const OrdersAnalyticsContainer = () => {

    const { data, isLoading } = useGetOrdersAnalyticsQuery({})


    const analyticsData = []

    data && data?.orders?.last12Months.forEach((item) => {
        analyticsData.push({ name: item.month.split(' ').slice(1).join(' '), orders: item.count })
    })


    const minValue = 0

    return (
        <div className='px-12 py-12 flex h-full'>
            {
                isLoading ? (
                    <Loading size='full'/>
                ) : (
                    <div className='h-full flex-1 flex flex-col'>
                        <div className='flex flex-col gap-1 text-center'>
                            <h4 className='text-2xl font-[500]'>Orders Analytics Overview</h4>
                            <p className='text-gray-600'>Insights and trends from the past year</p>
                        </div>

                        <div className='h-full flex items-center justify-centeroverflow-y-hidden'>
                            <ResponsiveContainer height="70%" >
                                <LineChart data={analyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" interval={0} dy={10} style={{ fontSize: '10px' }} />
                                    <YAxis style={{ fontSize: '10px' }}>
                                        <Label
                                            value="Orders Placed"
                                            angle={-90}
                                            position="insideLeft"
                                            style={{ textAnchor: 'middle', fontSize: 12 }}
                                        />
                                    </YAxis>
                                    <Tooltip />
                                    {/* <Legend /> */}
                                    <Line type="monotone" dataKey="orders" stroke="#163d3b" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default OrdersAnalyticsContainer