import React, { useEffect, useState } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import { Link, Outlet } from 'react-router-dom'
import useDocumentTitle from '../../utils/useDocumentTitle'
import screenErrorImage from '../../assets/images/screen-error.png'

const AdminDashboard = () => {
    useDocumentTitle('Elevana | Educator Dashboard')
    const [openSidebar, setOpenSidebar] = useState(true)
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024)

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024) // 1024px = Tailwind's "lg"
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (!isLargeScreen) {
        return (
            <div className="flex flex-col h-screen items-center justify-center gap-2 bg-background-green text-center p-6">
                <img src={screenErrorImage} className='w-[200px] bsm2:w-[225px] sm:w-[250px]' />
                <p className="text-center mt-3 text-sm sm:text-[15px] md:text-base ">
                    The Educator Dashboard is only available on desktop/laptop screens.
                    <p className='inline bsm2:block ml-1 bsm2:ml-0'>Please switch to a larger device.</p>
                </p>
                <Link to='/' className='mt-4 bg-black text-xs md:text-[13px] lg:text-sm text-white py-2 px-4 sm:py-2.5 sm:px-5 md:px-6  lg:px-7 font-[300] cursor-pointer hover:bg-zinc-700 shadow-sm rounded-4xl'>GO TO HOMEPAGE</Link>
            </div>
        )
    }


    return (
        <SidebarProvider open={openSidebar} onOpenChange={() => setOpenSidebar(!openSidebar)} className='bg-background-green'>
            <div className='flex h-screen  w-full bg-background-green'>
                <AdminSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                <div className='flex-1 overflow-y-scroll custom-scrollbar'><Outlet /></div>
            </div>
        </SidebarProvider>
    )
}

export default AdminDashboard