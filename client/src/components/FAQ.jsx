import { useGetLayoutDataQuery } from '../redux/features/layout/layoutApi'
import React, { useEffect, useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { BiMinus, BiPlus } from 'react-icons/bi'

const FAQ = () => {
    const { data, isLoading, refetch } = useGetLayoutDataQuery("FAQ", { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true })
    const [openIndex, setOpenIndex] = useState(null)

    useEffect(() => {
        refetch()
    }, [data])

    const handleToggle = (index) => {
        setOpenIndex(prev => (prev === index ? null : index))
    }


    return (
        <div className='bg-background-green min-h-screen flex items-center py-12 pb-14 sm:py-18 sm:pb-20 md:py-23 md:pb-24' id='faq'>
            <div className='mx-1.5 md:mx-3 lg:mx-4 xl:mx-auto max-w-7xl flex flex-col gap-6 sm:gap-9 md:gap-14 w-full'>
                <div className='flex flex-col gap-0 sm:gap-1.5 md:gap-2'>
                    <h3 className='text-center text-[23px] sm:text-2xl md:text-3xl lg:text-4xl font-[700]'>Frequently Asked <span className='text-grass-green'>Questions</span></h3>
                    <p className='text-center text-[13px] sm:text-[15px] md:text-[17px] lg:text-lg text-gray-600'>Got Questions? We've Got You Covered</p>
                </div>
                <div className='flex flex-col bg-white overflow-hidden rounded-sm border border-gray-200'>
                    {
                        data && data?.layout?.faq.map((item, index) => (
                            <Collapsible key={index} open={openIndex === index} onOpenChange={() => handleToggle(index)} className={`${index === data?.layout?.faq?.length-1 ? "border-none" : "border-b-1"} border-gray-300`}>
                                <CollapsibleTrigger className='flex items-center justify-between gap-4 w-full py-5 px-2 sm:py-6 sm:px-4 cursor-pointer'>
                                    <p className='text-sm md:text-base text-left'>{item.question}</p>
                                    <span className='text-base md:text-lg lg:text-xl'>

                                    {
                                        openIndex === index ? <BiMinus className='flex-shrink-0'/> : <BiPlus className='flex-shrink-0'/>
                                    }
                                    </span>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="px-2 py-4 sm:p-4 bg-gray-100 text-xs md:text-sm font-[300]">{item.answer}</CollapsibleContent>
                            </Collapsible>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FAQ