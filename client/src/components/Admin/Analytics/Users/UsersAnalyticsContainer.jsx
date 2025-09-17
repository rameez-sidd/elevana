import { Area, AreaChart, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Loading from '../../../Loading'
import { useGetUsersAnalyticsQuery } from '../../../../redux/features/analytics/analyticsApi'
import React from 'react'


const UsersAnalyticsContainer = () => {

    const { data, isLoading } = useGetUsersAnalyticsQuery({})


    const analyticsData = []

    data && data?.users?.last12Months.forEach((item) => {
        analyticsData.push({ name: item.month.split(' ').slice(1).join(' '), users: item.count })
    })


    const minValue = 0

    return (
        <div className='px-6 b2xl:px-12 py-12 flex h-full'>
            {
                isLoading ? (
                    <Loading size='full'/>
                ) : (
                    <div className='h-full flex-1 flex flex-col'>
                        <div className='flex flex-col gap-1 text-center'>
                            <h4 className='text-2xl font-[500]'>Users Analytics Overview</h4>
                            <p className='text-gray-600'>Insights and trends from the past year</p>
                        </div>

                        <div className='h-full flex items-center justify-centeroverflow-y-hidden'>
                            <ResponsiveContainer height="70%" >
                                <AreaChart data={analyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                                    <XAxis dataKey="name" interval={0} dy={10} style={{ fontSize: '10px' }}/>

                                    <YAxis style={{ fontSize: '10px' }}>
                                        <Label
                                            value="Unique Users Purchased"
                                            angle={-90}
                                            position="insideLeft"
                                            style={{ textAnchor: 'middle', fontSize: 12 }}
                                        />
                                    </YAxis>
                                    <Tooltip/>
                                    <Area dataKey="users" type="monotone" stroke="#163d3b" fill="#A6B89E"/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UsersAnalyticsContainer