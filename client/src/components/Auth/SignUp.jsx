import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useRegisterMutation, useSocialAuthMutation } from '../../redux/features/auth/authApi'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useGoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'


const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name!"),
    email: Yup.string().email("Invalid email!").required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(6),

})

const SignUp = ({ setActiveModal }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [register, { isLoading, isSuccess, error }] = useRegisterMutation()



    const formik = useFormik({
        initialValues: { name: "", email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ name, email, password }) => {
            try {
                const res = await register({ name, email, password }).unwrap()
                toast.success(res.message, { autoClose: 5000 })
                setActiveModal("verification")
            } catch (error) {
                const message =
                    error?.data?.message ||    // for backend custom error messages
                    error?.message ||          // for JS/RTK error messages
                    "Something went wrong. Please try again.";  // fallback message

                toast.error(message);
            }


        }

    })

    const { errors, touched, values, handleChange, handleSubmit } = formik

    const [socialAuth, { isLoading: isSocialLoading }] = useSocialAuthMutation()

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const googleData = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', { headers: { Authorization: `Bearer ${response.access_token}` } })
                try {
                    const res = await socialAuth({ email: googleData?.data?.email, name: googleData?.data?.name, avatar: googleData?.data?.profile }).unwrap()
                    toast.success(`Welcome ${res.user.name}`)
                    setActiveModal(null)
                } catch (error) {
                    const message = error?.data?.message || "Login failed. Please try again.";
                    toast.error(message)
                }

            } catch (error) {
                toast.error(error.message || "Something went wrong");

            }
        }

    })

    return (
        <Modal open onClose={() => setActiveModal(null)} aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description" className='flex items-center justify-center'>
            <Box className="max-w-sm w-[95%] sm:w-fit mx-auto outline-none border-none rounded-xl shadow-xl bg-background-green overflow-hidden">
                <div className='flex flex-col '>
                    <h2 className='text-xl sm:text-2xl font-[600] bg-light-green px-7 py-5 text-center'>Get Started with <span className='font-plaster text-dark-green'>Elevana</span></h2>
                    <div className='px-7 py-5'>
                        <form className='flex flex-col gap-4.5' onSubmit={handleSubmit}>
                            <div className='flex flex-col'>
                                <label htmlFor="name" className='font-[300] text-sm mb-0.5'>Name</label>
                                <input type="text" name="name" id="name" value={values.name} onChange={handleChange} className={`border ${errors.name && touched.name ? "border-red-600" : "border-gray-400"} outline-none px-2 py-1 rounded-md text-sm`} />
                                {errors.name && touched.name && (
                                    <span className="text-red-600 text-xs">{errors.name}</span>
                                )}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="email" className='font-[300] text-sm mb-0.5'>Email</label>
                                <input type="email" name="email" id="email" value={values.email} onChange={handleChange} className={`border ${errors.email && touched.email ? "border-red-600" : "border-gray-400"}  outline-none px-2 py-1 rounded-md text-sm`} />
                                {errors.email && touched.email && (
                                    <span className="text-red-600 text-xs">{errors.email}</span>
                                )}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="password" className='font-[300] text-sm mb-0.5'>Password</label>
                                <div className={`flex  border ${errors.password && touched.password ? "border-red-600" : "border-gray-400"}  rounded-md text-sm overflow-hidden`}>
                                    <input type={!showPassword ? "password" : "text"} name="password" id="password" value={values.password} onChange={handleChange} className='w-full outline-none px-2 py-1 ' />
                                    <div className='px-2 hover:bg-gray-200 grid place-items-center cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}

                                    </div>

                                </div>
                                {errors.password && touched.password && (
                                    <span className="text-red-600 text-xs">{errors.password}</span>
                                )}
                            </div>
                            <div>
                                <input type="submit" value={isLoading ? "Registering..." : "Register"} disabled={isLoading} className={`bg-grass-green text-white w-full py-1.5 rounded-md  ${isLoading ? "bg-gray-300 cursor-not-allowed hover:bg-gray-300" : "cursor-pointer hover:bg-dark-grass-green"} outline-none focus:outline-none`} />
                            </div>

                            {/* Social Authentication */}
                            <div className='mt-0 flex flex-col gap-2.5 items-center '>
                                <p className='text-sm'>or</p>
                                <div className='flex items-center justify-center gap-4 w-full' >
                                    <div className=' bg-white rounded-full border cursor-pointer hover:bg-gray-200 border-gray-300 flex items-center justify-center gap-2 py-1 pl-1 pr-2' onClick={() => handleGoogleLogin()}>
                                        <FcGoogle size={25} className='cursor-pointer rounded-full'  />
                                        <p className='text-xs pr-1'>Sign in with Google</p>
                                    </div>
                                    
                                </div>
                                <p className='text-sm font-[300] mt-3'>Already have an account? <span className={`font-[500] text-dark-grass-green hover:underline ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={() => setActiveModal('login')}>Login</span></p>
                            </div>

                        </form>
                    </div>

                </div>
            </Box>
        </Modal>
    )
}

export default SignUp