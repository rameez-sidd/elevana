import React from 'react'
import DashboardHeader from '../../DashboardHeader'
import OrdersAnalyticsContainer from './OrdersAnalyticsContainer'

const OrdersAnalytics = () => {
  return (
    <div className='flex flex-col h-screen'>
        <DashboardHeader title='Orders Analytics'/>
        <div className='flex-1'>
            <OrdersAnalyticsContainer/>
        </div>
    </div>
  )
}

export default OrdersAnalytics