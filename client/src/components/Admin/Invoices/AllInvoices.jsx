import React from 'react'
import DashboardHeader from '../DashboardHeader'
import InvoicesTable from './InvoicesTable'


const AllInvoices = () => {

  

  return (
    <div className='flex flex-col h-screen'>
      <DashboardHeader title='Invoices' />
      <div className='flex-1'>
        <InvoicesTable/>
      </div>
    </div>
  )
}

export default AllInvoices