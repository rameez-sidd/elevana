import { Box, Modal } from '@mui/material'
import React from 'react'
import { useLogOutMutation } from '../../redux/features/auth/authApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Logout = ({ openLogout, setOpenLogout }) => {
    const [logOut, { isLoading }] = useLogOutMutation()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logOut().unwrap()
            navigate('/')
            toast.success("Logout successful")
        } catch (error) {
            const message = error?.data?.message || "Logout failed. Please try again."
            toast.error(message)
        }
    }

    return (
        <Modal open={openLogout} onClose={() => setOpenLogout(false)} aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] outline-none border-none rounded-xl shadow-xl bg-background-green overflow-hidden">
                <div className='flex flex-col '>
                    <h2 className='text-lg font-[600] bg-light-green px-2 py-2 text-center'>Ready to <span className='text-dark-green'>Sign Off</span>?</h2>
                    <div className='px-5 py-5 flex flex-col gap-5'>
                        <h3 className='text-md'>Are you sure you want to log out?</h3>
                        <div className='flex items-center justify-between'>
                            
                            <button className='min-w-28 py-1.5 bg-dark-green text-sm hover:bg-muted-green text-white rounded-md cursor-pointer' onClick={() => setOpenLogout(false)}>Stay</button>

                            <button disabled={isLoading} className={`min-w-28 py-1.5 text-sm bg-red-700 hover:bg-red-500 text-white rounded-md ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={handleLogout}>{isLoading ? "Logging out..." : "Yes, Log Out"}</button>
                        </div>
                    </div>

                </div>
            </Box>
        </Modal>
    )
}

export default Logout