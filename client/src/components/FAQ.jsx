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
        <div className='bg-background-green min-h-screen flex items-center py-23' id='faq'>
            <div className='mx-auto max-w-7xl flex flex-col gap-14 w-full'>
                <div className='flex flex-col gap-2'>
                    <h3 className='text-center text-4xl font-[700]'>Frequently Asked <span className='text-grass-green'>Questions</span></h3>
                    <p className='text-center text-lg text-gray-600'>Got Questions? We've Got You Covered</p>
                </div>
                <div className='flex flex-col bg-white overflow-hidden rounded-sm border border-gray-200'>
                    {
                        data && data?.layout?.faq.map((item, index) => (
                            <Collapsible key={index} open={openIndex === index} onOpenChange={() => handleToggle(index)} className={`${index === data?.layout?.faq?.length-1 ? "border-none" : "border-b-1"} border-gray-300`}>
                                <CollapsibleTrigger className='flex items-center justify-between w-full py-6 px-4 cursor-pointer'>
                                    <p className='text-md'>{item.question}</p>
                                    {
                                        openIndex === index ? <BiMinus size={22} /> : <BiPlus size={22} />
                                    }
                                </CollapsibleTrigger>
                                <CollapsibleContent className=" py-4 px-4 bg-gray-100 text-sm font-[300]">{item.answer}</CollapsibleContent>
                            </Collapsible>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FAQ