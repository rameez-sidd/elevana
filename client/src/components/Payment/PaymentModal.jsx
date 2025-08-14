
import { Box, Modal } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js';
import React from 'react'
import { RiCloseLargeFill } from 'react-icons/ri';
import PaymentForm from './PaymentForm';

const PaymentModal = ({ data, setOpenPayment, stripePromise, clientSecret }) => {

    const handleClose = (reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            return;
        }
    }

    return (
        <Modal open onClose={handleClose} aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description" >
            <Box className="flex items-start justify-center z-50 px-2 bsm:px-4 bsm2:px-6 sm:px-10 bmd:px-13! md:px-2! lg:px-0 py-10 overflow-y-auto custom-scrollbar  h-full">
                <div className="bg-background-green rounded-xl shadow-xl w-full max-w-7xl">
                    
                    <div className='w-full '>
                        {
                            stripePromise && clientSecret && (
                                <Elements stripe={stripePromise} options={{clientSecret}}>
                                    <PaymentForm setOpenPayment={setOpenPayment} data={data}/>
                                </Elements>
                            )
                        }
                    </div>
                    
                </div>
            </Box>
        </Modal>
    )
}

export default PaymentModal