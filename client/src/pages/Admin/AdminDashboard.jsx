import React, { useState } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import { Outlet } from 'react-router-dom'
import useDocumentTitle from '../../utils/useDocumentTitle'

const AdminDashboard = () => {
    useDocumentTitle('Elevana | Educator Dashboard')
    const [openSidebar, setOpenSidebar] = useState(true)
    


    return (
        <SidebarProvider open={openSidebar} onOpenChange={() => setOpenSidebar(!openSidebar)} className='bg-background-green'>
            <div className='flex h-screen  w-full bg-background-green'>
                <AdminSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
                <div className='flex-1  overflow-y-scroll custom-scrollbar'><Outlet/></div>
            </div>
        </SidebarProvider>
    )
}

export default AdminDashboard