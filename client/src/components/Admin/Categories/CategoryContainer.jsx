import Loading from '../../Loading'
import { useEditLayoutMutation, useGetLayoutDataQuery } from '../../../redux/features/layout/layoutApi'
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { TbCategoryPlus } from "react-icons/tb";

const CategoryContainer = () => {
    const [categories, setCategories] = useState([])

    const { data, isLoading } = useGetLayoutDataQuery("Categories", { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true })

    const [editLayout] = useEditLayoutMutation()
    

    useEffect(() => {
        if (data) {
            setCategories(data.layout.categories)
        }
    }, [data])

    const handleAddCategory = (id, value) => {
        setCategories((prevCategory) => prevCategory.map((i) => (i._id === id ? { ...i, title: value } : i)))
    }

    const newCategoriesHandler = () => {
        if (categories[categories.length - 1].title === '') {
            toast.error("Please enter category title")
        } else {
            setCategories((prevCategory) => [...prevCategory, { title: "" }])
        }
    }

    const areCategoriesUnchanged = (originalCategories, newCategories) => {
        return JSON.stringify(originalCategories) === JSON.stringify(newCategories)
    }

    const isAnyCategoryTitleEmpty = (categories) => {
        return categories.some((q) => q.title === "")
    }

    const editCategoriesHandler = async () => {
        if (!areCategoriesUnchanged(data.layout.categories, categories) && !isAnyCategoryTitleEmpty(categories)) {
            try {
                const res = await editLayout({ type: "Categories", categories })
                toast.success("Categories updated successfully!");

            } catch (error) {
                const message = error?.data?.message || error?.message || "Something went wrong.";
                toast.error(message);
            }
        }
    }

    return (
        <div className='px-12 py-12 h-full flex '>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <div className=' h-full flex-1 flex items-center justify-center relative'>
                        <div className='flex flex-col gap-8'>

                            <div className='flex flex-col gap-3'>
                                {
                                    categories && categories.map((item, index) => (
                                        <div key={index} className='flex items-center gap-12 bg-white p-2 px-4 shadow-sm rounded-sm'>
                                            <input type="text" value={item.title} onChange={(e) => handleAddCategory(item._id, e.target.value)} className='outline-none border-none placeholder:text-sm placeholder:font-[300]' placeholder='Enter cateogry title...' />
                                            <MdDelete size={25} onClick={() => {
                                                setCategories((prevCategory) => prevCategory.filter((i) => i._id !== item._id))
                                            }} className='hover:bg-gray-200 cursor-pointer p-0.5 rounded-sm' />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='flex justify-center'>
                                <TbCategoryPlus size={26} onClick={newCategoriesHandler} className='cursor-pointer hover:text-dark-grass-green rounded-sm' />
                            </div>
                        </div>

                        <div className={`absolute bottom-4 right-4 bg-dark-green text-white text-sm w-30 hover:bg-dark-grass-green py-1.5 rounded-sm text-center ${areCategoriesUnchanged(data.layout?.categories, categories) || isAnyCategoryTitleEmpty(categories) ? "!cursor-not-allowed bg-gray-400 hover:bg-gray-400" : "!cursor-pointer"}`} onClick={areCategoriesUnchanged(data.layout?.categories, categories) || isAnyCategoryTitleEmpty(categories) ? () => null : editCategoriesHandler }>Save</div>
                    </div>
                )
            }

        </div>
    )
}

export default CategoryContainer