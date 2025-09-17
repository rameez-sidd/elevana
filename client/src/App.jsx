import React, { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { apiSlice } from './redux/api/apiSlice';
import socketIO from 'socket.io-client';
import Loading from './components/Loading';
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
import CoursesAnalytics from './components/Admin/Analytics/Courses/CoursesAnalytics';
import UsersAnalytics from './components/Admin/Analytics/Users/UsersAnalytics';
import OrdersAnalytics from './components/Admin/Analytics/Orders/OrdersAnalytics';
import AllInvoices from './components/Admin/Invoices/AllInvoices';
import CourseDetailsPage from './pages/CourseDetailsPage';
import ProfileAdmin from './components/Admin/Profile/ProfileAdmin';
import ChangePasswordAdmin from './components/Admin/ChangePassword/ChangePasswordAdmin';
import CourseAccessPage from './pages/CourseAccessPage';
import CourseQA from './components/Admin/Course/CourseQA';
import NotFound from './pages/NotFound';
import { useDispatch } from 'react-redux';
import { setModalOpen } from './redux/features/auth/authSlice';

const ENDPOINT = import.meta.env.VITE_PUBLIC_SOCKET_SERVER_URI || ""
const socketId = socketIO(ENDPOINT, {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  randomizationFactor: 0.5,
  transports: ["websocket", "polling"],
  upgrade: true,
  forceNew: true,
  timeout: 20000
})


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
    path: "/course/:id",
    element: <CourseDetailsPage />,
  },
  {
    path: "/course-access/:id",
    element: <CourseAccessPage />,
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

      { path: "course-qa/:id", element: <CourseQA /> },
      { path: "all-courses", element: <AllCourses /> },
      { path: "students", element: <Students /> },
      { path: "categories", element: <Categories /> },
      { path: "courses-analytics", element: <CoursesAnalytics /> },
      { path: "users-analytics", element: <UsersAnalytics /> },
      { path: "orders-analytics", element: <OrdersAnalytics /> },
      { path: "invoices", element: <AllInvoices /> },
      { path: "profile", element: <ProfileAdmin /> },
      { path: "change-password", element: <ChangePasswordAdmin /> },
    ]

  },
  {
    path: "*",
    element: <NotFound />,
  },


])

const App = () => {

  const dispatch = useDispatch()
   useEffect(() => {
    // Reset modal every time app is freshly loaded
    dispatch(setModalOpen(""));
  }, [dispatch]);

  useEffect(() => {
    socketId.on('connect', () => {
      console.log('Socket connected:', socketId.id);
    });

    return () => {
      socketId.off('connect');
    };
  }, []);

  return <RouterProvider router={appRouter} />;
}

export default App