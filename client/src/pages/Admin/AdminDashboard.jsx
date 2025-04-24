import React, { useCallback } from 'react'
import Dashboard from '../../components/Admin/Dashboard/Dashboard'
import { SidebarProvider } from '@/components/ui/sidebar'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import Users from '../../components/Admin/User/Users'
import CreateCourse from '../../components/Admin/Course/CreateCourse'
import { useSelector, useDispatch } from 'react-redux'
import { setActivePage, setOpenSidebar } from '../../redux/features/admin/adminSlice'
import AllCourses from '../../components/Admin/Course/AllCourses'

const AdminDashboard = () => {
    const dispatch = useDispatch()
    const { activePage, openSidebar } = useSelector((state) => state.admin)

    const handlePageChange = useCallback((page) => {
        dispatch(setActivePage(page));
    }, [dispatch]);

    const handleSidebarChange = useCallback((value) => {
        dispatch(setOpenSidebar(value));
    }, [dispatch]);

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard':
                return <Dashboard />
            case 'create-course':
                return <CreateCourse activePage={activePage} setActivePage={handlePageChange} />
            case 'all-courses':
                return <AllCourses />
            case 'users':
                return <Users />
            default:
                return <Dashboard />
        }
    }

    return (
        <SidebarProvider open={openSidebar} onOpenChange={handleSidebarChange} className='bg-background-green'>
            <div className='flex h-screen  w-full bg-background-green'>
                <AdminSidebar
                    openSidebar={openSidebar}
                    setOpenSidebar={handleSidebarChange}
                    activePage={activePage}
                    setActivePage={handlePageChange}
                />
                <div className='flex-1  overflow-y-scroll custom-scrollbar'>{renderPage()}</div>
            </div>
        </SidebarProvider>
    )
}

export default AdminDashboard