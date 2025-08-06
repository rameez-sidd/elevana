import { Box, Modal } from '@mui/material'
import React, { useRef, useState } from 'react'
import verifyImage from '../../assets/images/verify.png'
import { useActivateMutation } from '../../redux/features/auth/authApi'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Verification = ({ setActiveModal }) => {
    const inputRefs = useRef([])
    const [activate, {isLoading }] = useActivateMutation()
    const {token : activation_token} = useSelector((state) => state.auth)
    const [invalidCode, setInvalidCode] = useState(false)
    const [otp, setOtp] = useState(['', '', '', ''])

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            setInvalidCode(false)

            if (value && index < 3) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const activation_code = otp.join("");

        if(activation_code.length !== 4){
            toast.error("Please enter a valid 4-digit OTP")
            setInvalidCode(true)
            return
        }
        try {
            const res = await activate({ activation_token, activation_code }).unwrap();
            toast.success("Account activated successfully!");
            setActiveModal("login");
        } catch (error) {
            const message = error?.data?.message || "Activation failed. Please try again.";
            setInvalidCode(true)
            toast.error(message);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            return;
        }
        setActiveModal(null);
    };

    return (
        <Modal 
            open 
            onClose={handleClose} 
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableEscapeKeyDown
            disableBackdropClick
            className='flex items-center justify-center'
        >
            <Box className="max-w-sm w-[95%] sm:w-fit mx-auto outline-none border-none rounded-xl shadow-xl bg-background-green overflow-hidden">
                <div className='flex flex-col '>
                    <h2 className='text-xl sm:text-2xl font-[600] bg-light-green px-7 py-5 text-center'>Verify Your Account</h2>
                    <div className='px-7 py-5 flex flex-col gap-5'>
                        <div className='grid place-items-center'>
                            <img src={verifyImage} alt="verify" width={140} />
                        </div>
                        <div className='flex items-center gap-4'>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className={`w-14 h-14 text-2xl font-bold text-center rounded-md outline-1 focus:outline-3 focus:outline-dark-green ${invalidCode ? "outline-3 outline-red-600" : "outline-black"}`}
                                />
                            ))}
                        </div>
                        <div>
                            <button onClick={handleSubmit} disabled={isLoading}  className={`outline-none focus:outline-none bg-grass-green text-white w-full py-1.5 rounded-md ${isLoading ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed" : "cursor-pointer hover:bg-dark-grass-green "}`}>{isLoading ? "Verifying..." : "Verify OTP"}</button>
                        </div>
                        <p className='text-sm font-[300] mt-3'>Already verified or have an account? <span className={`font-[500] text-dark-grass-green hover:underline ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={() => setActiveModal('login')}>Login</span></p>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default Verification