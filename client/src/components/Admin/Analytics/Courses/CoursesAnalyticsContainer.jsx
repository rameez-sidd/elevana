import { Bar, BarChart, Label, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import Loading from '../../../Loading'
import { useGetCoursesAnalyticsQuery } from '../../../../redux/features/analytics/analyticsApi'
import React from 'react'


const CoursesAnalyticsContainer = () => {

    const { data, isLoading } = useGetCoursesAnalyticsQuery({})

    const analyticsData = []

    data && data?.courses?.last12Months.forEach((item) => {
        analyticsData.push({ name: item.month.split(' ').slice(1).join(' '), courses: item.count })
    })


    const minValue = 0

    return (
        <div className='px-6 b2xl:px-12 py-12 flex h-full'>
            {
                isLoading ? (
                    <Loading size='full' />
                ) : (
                    <div className='h-full flex-1 flex flex-col'>
                        <div className='flex flex-col gap-1 text-center'>
                            <h4 className='text-2xl font-[500]'>Courses Analytics Overview</h4>
                            <p className='text-gray-600'>Insights and trends from the past year</p>
                        </div>

                        <div className='h-full flex items-center justify-centeroverflow-y-hidden'>
                            <ResponsiveContainer height="70%" >
                                <BarChart data={analyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                                    <XAxis dataKey="name"  interval={0} dy={10} style={{ fontSize: '10px' }}>
                                        <Label offset={0} position='insideBottom' />
                                    </XAxis>

                                    <YAxis domain={[minValue, "auto"]} style={{ fontSize: '10px' }}>
                                        <Label
                                            value="Courses Published"
                                            angle={-90}
                                            position="insideLeft"
                                            style={{ textAnchor: 'middle', fontSize: 12 }}
                                        />
                                    </YAxis>
                                    <Bar dataKey="courses" fill='#A6B89E'>
                                        <LabelList dataKey="courses" position="top" />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default CoursesAnalyticsContainer