import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home'
import Profile from './pages/Profile';
import ProtectedRoute from './utils/ProtectedRoute';
import Courses from './pages/Courses';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AuthorizeRoles from './utils/AuthorizeRole';
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <ProtectedRoute><Profile /></ProtectedRoute>,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/admin/admin-dashboard",
    element: <ProtectedRoute><AuthorizeRoles><AdminDashboard /></AuthorizeRoles></ProtectedRoute>,
  },

])

const App = () => {

  


  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App