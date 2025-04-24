import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";



import { TbLayoutDashboardFilled, TbLayoutSidebarRightExpandFilled, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { HiUsers } from "react-icons/hi2";
import { FaFileInvoiceDollar, FaCartShopping } from "react-icons/fa6";
import { RiLiveFill, RiVideoAddFill, RiTeamFill, RiSettingsFill  } from "react-icons/ri";
import { SiGoogleanalytics } from "react-icons/si";
import { FaUsersCog } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";


import { useSelector } from "react-redux";
import profilePic from "../../assets/images/avatar.jpg";
import { formatName } from "../../utils/formatName";
import { useState } from "react";

const AdminSidebar = ({openSidebar, setOpenSidebar, activePage, setActivePage}) => {
    const { user } = useSelector((state) => state.auth)

    return (
        


            <Sidebar collapsible="icon" className='bg-light-green border-none' >
                <SidebarHeader className='bg-dark-green py-1'>
                    <div className={`flex items-center ${openSidebar ? "justify-between" : "justify-center"}`}>
                        <h2 className={`font-plaster text-lg text-white ${!openSidebar && 'hidden' }`}>Elevana</h2>
                        {
                            openSidebar ? (
                                <TbLayoutSidebarRightExpandFilled size={22} className="cursor-pointer h-full text-white" onClick={() => setOpenSidebar(false)}/>
                            ) : (
                                <TbLayoutSidebarLeftExpandFilled size={22} className="cursor-pointer h-full text-white" onClick={() => setOpenSidebar(true)}/>
                            )
                        }
                        
                        
                    </div>
                </SidebarHeader>
                <SidebarContent className="custom-scrollbar bg-light-green pb-5">
                    <SidebarGroup className=' pt-4 pb-2'>
                        <SidebarGroupContent className="flex items-center justify-center">
                            <div className="py-3 flex flex-col items-center gap-2">
                                <div className={`${!openSidebar && 'hidden'}`}>
                                    <img src={user?.avatar ? user?.avatar?.url : profilePic} alt="avatar" className={`w-18 h-18 rounded-full object-cover cursor-pointer outline-3 outline-dark-green p-0.5 shadow-lg`} />
                                </div>
                                <div className="text-xl font-[800] ">{user && openSidebar ? formatName(user?.name) : user?.name.charAt(0)}</div>
                            </div>

                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup >
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild className={`${activePage === 'dashboard' ? "bg-dark-green text-white hover:bg-dark-green hover:text-white" : "hover:bg-green"} rounded-4xl px-3 transition-all duration-300`} onClick={() => setActivePage("dashboard")}>
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
                                    <SidebarMenuButton asChild className={`${activePage === 'users' ? "bg-dark-green text-white hover:bg-dark-green hover:text-white" : "hover:bg-green"} rounded-4xl px-3 transition-all duration-300`} onClick={() => setActivePage("users")}>
                                        <div className="flex items-center gap-3 cursor-pointer">
                                            <HiUsers className="h-5 w-5" />
                                            <span>Users</span>
                                        </div>
                                        
                                            
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild className='hover:bg-green rounded-4xl px-3 transition-all duration-300'>
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
                                    <SidebarMenuButton asChild className={`${activePage === 'create-course' ? "bg-dark-green text-white hover:bg-dark-green hover:text-white" : "hover:bg-green"} rounded-4xl px-3 transition-all duration-300`} onClick={() => setActivePage("create-course")}>
                                        <div className="flex items-center gap-3 cursor-pointer">
                                            <RiVideoAddFill className="h-5 w-5" />
                                            <span>Create Course</span>
                                        </div>
                                        
                                            
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild className={`${activePage === 'all-courses' ? "bg-dark-green text-white hover:bg-dark-green hover:text-white" : "hover:bg-green"} rounded-4xl px-3 transition-all duration-300`} onClick={() => setActivePage("all-courses")}>
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
                        <SidebarGroupLabel>Controllers</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild className='hover:bg-green rounded-4xl px-3 transition-all duration-300'>
                                        <div className="flex items-center gap-3 cursor-pointer">
                                            <RiTeamFill className="h-5 w-5" />
                                            <span>Manage Team</span>
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
                                    <SidebarMenuButton asChild className='hover:bg-green rounded-4xl px-3 transition-all duration-300'>
                                        <div className="flex items-center gap-3 cursor-pointer">
                                            <SiGoogleanalytics className="h-5 w-5" />
                                            <span>Courses Analytics</span>
                                        </div>
                                        
                                            
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild className='hover:bg-green rounded-4xl px-3 transition-all duration-300'>
                                        <div className="flex items-center gap-3 cursor-pointer">
                                            <FaCartShopping className="h-5 w-5" />
                                            <span>Orders Analytics</span>
                                        </div>
                                        
                                            
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild className='hover:bg-green rounded-4xl px-3 transition-all duration-300'>
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
                                    <SidebarMenuButton asChild className='hover:bg-green rounded-4xl px-3 transition-all duration-300'>
                                        <div className="flex items-center gap-3 cursor-pointer">
                                            <RiSettingsFill className="h-5 w-5" />
                                            <span>Settings</span>
                                        </div>
                                        
                                            
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild className='hover:bg-green rounded-4xl px-3 transition-all duration-300'>
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

            </Sidebar>
        
    );
}


export default AdminSidebar;