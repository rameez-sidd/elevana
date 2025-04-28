import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home'
import Profile from './pages/Profile';
import ProtectedRoute from './utils/ProtectedRoute';
import Courses from './pages/Courses';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AuthorizeRoles from './utils/AuthorizeRole';
import MyAccount from './components/Profile/MyAccount';
import ChangePassword from './components/Profile/ChangePassword';
import EnrolledCourses from './components/Profile/EnrolledCourses';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateCourse from './components/Admin/Course/CreateCourse';
import AllCourses from './components/Admin/Course/AllCourses';
import CourseInfo from './components/Admin/Course/CourseInfo';
import CourseData from './components/Admin/Course/CourseData';
import CourseContent from './components/Admin/Course/CourseContent';
import CoursePreview from './components/Admin/Course/CoursePreview';
import Students from './components/Admin/Student/Students';
import Categories from './components/Admin/Categories/Categories';
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <ProtectedRoute><Profile /></ProtectedRoute>,
    children: [
      { path: "", element: <MyAccount /> },
      { path: "change-password", element: <ChangePassword /> },
      { path: "enrolled-courses", element: <EnrolledCourses /> },

    ]
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/admin/admin-dashboard",
    element: <ProtectedRoute><AuthorizeRoles><AdminDashboard /></AuthorizeRoles></ProtectedRoute>,
    children: [
      { path: "", element: <Dashboard /> },
      {
        path: "create-course",
        element: <CreateCourse />,
        children: [
          { path: "", element: <CourseInfo /> },
          { path: "course-data", element: <CourseData /> },
          { path: "course-content", element: <CourseContent /> },
          { path: "course-preview", element: <CoursePreview /> },

        ]

      },

      { path: "all-courses", element: <AllCourses /> },
      { path: "students", element: <Students /> },
      { path: "categories", element: <Categories /> },
    ]

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