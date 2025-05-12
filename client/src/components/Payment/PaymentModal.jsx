
import { Box, Modal } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js';
import React, { useState } from 'react'
import { RiCloseLargeFill } from 'react-icons/ri';
import PaymentForm from './PaymentForm';

const PaymentModal = ({ data, setOpenPayment, stripePromise, clientSecret }) => {

    const handleClose = () => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            return;
        }
    }

    return (
        <Modal open onClose={handleClose} aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description" >
            <Box className="fixed inset-0 flex items-center justify-center z-50 px-4 overflow-hidden  ">
                <div className="bg-background-green rounded-xl shadow-xl max-h-[90vh] overflow-y-hidden w-full max-w-7xl">
                    
                    <div className='w-full max-h-[90vh] '>
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