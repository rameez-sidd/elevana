import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { TbLayoutDashboardFilled, TbLayoutSidebarRightExpandFilled, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { GoSidebarExpand } from "react-icons/go";
import { HiUsers } from "react-icons/hi2";
import { FaFileInvoiceDollar, FaCartShopping } from "react-icons/fa6";
import { RiLiveFill, RiVideoAddFill, RiTeamFill, RiSettingsFill, RiProfileFill, RiLockPasswordFill } from "react-icons/ri";
import { SiGoogleanalytics } from "react-icons/si";
import { FaUsersCog } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Logout from "../Auth/Logout";

const AdminSidebar = ({ openSidebar, setOpenSidebar }) => {
    const { user } = useSelector((state) => state.auth)
    const isEditing = useSelector((state) => state.courseCreation.isEditing)
    const navigate = useNavigate()
    const location = useLocation()
    const [openLogout, setOpenLogout] = useState(false)


    const menuButtonStyle = (url) => {
        return `rounded-4xl px-3 transition-all duration-300 ${location.pathname.includes(url) ? "bg-dark-green text-white hover:bg-dark-green hover:text-white" : "hover:bg-light-green"}`
    }

    

   

    return (
        <Sidebar collapsible="icon" className='bg-white border-r-2 border-gray-300'>
            <SidebarHeader className='bg-dark-green py-1'>
                <div className={`flex items-center ${openSidebar ? "justify-between" : "justify-center"}`}>
                    <h2 className={`font-plaster text-lg text-white ${!openSidebar && 'hidden'}`}>Elevana</h2>
                    <GoSidebarExpand size={37} className={`text-white hover:bg-muted-green cursor-pointer rounded-sm ${openSidebar ? "p-1.5" : "p-[3px]"}`} onClick={() => setOpenSidebar(!openSidebar)}/>
                </div>
            </SidebarHeader>

            <SidebarContent className="custom-scrollbar bg-white py-5">

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                    <SidebarMenuButton asChild className={`rounded-4xl px-3 transition-all duration-300 ${location.pathname === '/admin/admin-dashboard' ? "bg-dark-green text-white hover:bg-dark-green hover:text-white" : "hover:bg-light-green"}`} onClick={() => navigate('/admin/admin-dashboard')}>
                                        <div className="flex items-center gap-3 cursor-pointer">
                                            <TbLayoutDashboardFilled className="h-5 w-5" />
                                            <span>Dashboard</span>
                                        </div>
                                    </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                

                <SidebarGroup>
                    <SidebarGroupLabel>Data</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                
                                    <SidebarMenuButton asChild  className={menuButtonStyle('students')} onClick={() => navigate('/admin/admin-dashboard/students')}>
                                        <div className="flex items-center gap-3 cursor-pointer">
                                            <HiUsers className="h-5 w-5" />
                                            <span>Students</span>
                                        </div>
                                    </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className={menuButtonStyle('invoices')} onClick={() => navigate('/admin/admin-dashboard/invoices')}>
                                    <div className="flex items-center gap-3 cursor-pointer">
                                        <FaFileInvoiceDollar className="h-5 w-5" />
                                        <span>Invoices</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Content</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                    <SidebarMenuButton asChild className={menuButtonStyle('create-course')} onClick={() => navigate('/admin/admin-dashboard/create-course')}>
                                        <div className="flex items-center gap-3 cursor-pointer">
                                            <RiVideoAddFill className="h-5 w-5" />
                                            <span>{isEditing ? "Edit Course" : "Create Course"}</span>
                                        </div>
                                    </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                    <SidebarMenuButton asChild className={menuButtonStyle('all-courses')} onClick={() => navigate('/admin/admin-dashboard/all-courses')}>
                                        <div className="flex items-center gap-3 cursor-pointer">
                                            <RiLiveFill className="h-5 w-5" />
                                            <span>All Courses</span>
                                        </div>
                                    </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>


                <SidebarGroup>
                    <SidebarGroupLabel>Customization</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className={menuButtonStyle('categories')} onClick={() => navigate('/admin/admin-dashboard/categories')}>
                                    <div className="flex items-center gap-3 cursor-pointer">
                                        <MdCategory className="h-5 w-5" />
                                        <span>Categories</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Analytics</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className={menuButtonStyle('courses-analytics')} onClick={() => navigate('/admin/admin-dashboard/courses-analytics')}>
                                    <div className="flex items-center gap-3 cursor-pointer">
                                        <SiGoogleanalytics className="h-5 w-5" />
                                        <span>Courses Analytics</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className={menuButtonStyle('orders-analytics')} onClick={() => navigate('/admin/admin-dashboard/orders-analytics')}>
                                    <div className="flex items-center gap-3 cursor-pointer">
                                        <FaCartShopping className="h-5 w-5" />
                                        <span>Orders Analytics</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className={menuButtonStyle('users-analytics')} onClick={() => navigate('/admin/admin-dashboard/users-analytics')}>
                                    <div className="flex items-center gap-3 cursor-pointer">
                                        <FaUsersCog className="h-5 w-5" />
                                        <span>Users Analytics</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Extras</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className={menuButtonStyle('profile')} onClick={() => navigate('/admin/admin-dashboard/profile')}>
                                    <div className="flex items-center gap-3 cursor-pointer">
                                        <RiProfileFill className="h-5 w-5" />
                                        <span>Profile</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className={menuButtonStyle('change-password')} onClick={() => navigate('/admin/admin-dashboard/change-password')}>
                                    <div className="flex items-center gap-3 cursor-pointer">
                                        <RiLockPasswordFill className="h-5 w-5" />
                                        <span>Change Password</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild onClick={() => setOpenLogout(true)} className='hover:bg-light-green rounded-4xl px-3 transition-all duration-300'>
                                    <div className="flex items-center gap-3 cursor-pointer">
                                        <IoLogOut className="h-5 w-5" />
                                        <span>Logout</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>

            <Logout openLogout={openLogout} setOpenLogout={setOpenLogout} />
        </Sidebar>
    );
};

export default AdminSidebar;
