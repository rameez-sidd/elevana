import Loading from '../../Loading'
import { useEditLayoutMutation, useGetLayoutDataQuery } from '../../../redux/features/layout/layoutApi'
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { TbCategoryPlus } from "react-icons/tb";

const CategoryContainer = () => {
    const [categories, setCategories] = useState([])

    const { data, isLoading } = useGetLayoutDataQuery("Categories", { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true })

    const [editLayout, {isLoading: isAddingCategory}] = useEditLayoutMutation()
    
    useEffect(() => {
        if (data) {
            setCategories(data.layout.categories)
        }
    }, [data])

    const handleAddCategory = (id, value) => {
        setCategories((prevCategory) => 
            prevCategory.map((i) => (i._id === id ? { ...i, title: value } : i))
        )
    }

    const newCategoriesHandler = () => {
        if (categories.length > 0 && categories[categories.length - 1].title === '') {
            toast.error("Please enter category title")
        } else {
            // Add a new category with a temporary unique ID
            const newCategory = {
                _id: `temp_${Date.now()}`,
                title: ""
            }
            setCategories((prevCategory) => [...prevCategory, newCategory])
        }
    }

    const areCategoriesUnchanged = (originalCategories, newCategories) => {
        // Filter out temporary IDs for comparison
        const cleanOriginal = originalCategories.map(cat => ({ title: cat.title }))
        const cleanNew = newCategories.map(cat => ({ title: cat.title }))
        return JSON.stringify(cleanOriginal) === JSON.stringify(cleanNew)
    }

    const isAnyCategoryTitleEmpty = (categories) => {
        return categories.some((q) => q.title === "")
    }

    const editCategoriesHandler = async () => {
        if (!areCategoriesUnchanged(data.layout.categories, categories) && !isAnyCategoryTitleEmpty(categories)) {
            try {
                // Remove temporary IDs before sending to server
                const categoriesToSave = categories.map(cat => ({
                    title: cat.title,
                    ...(cat._id && !cat._id.startsWith('temp_') ? { _id: cat._id } : {})
                }))
                
                const res = await editLayout({ type: "Categories", categories: categoriesToSave })
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
                    <Loading size='full'/>
                ) : (
                    <div className=' h-full flex-1 flex items-center justify-center relative'>
                        <div className='flex flex-col gap-8 '>

                            <div className='flex flex-col gap-3 max-h-[40vh] overflow-y-scroll custom-scrollbar'>
                                {
                                    categories && categories.map((item, index) => (
                                        <div key={item._id || index} className='flex items-center gap-12 bg-white border border-gray-300 p-2 px-4 rounded-sm'>
                                            <input 
                                                type="text" 
                                                value={item.title} 
                                                onChange={(e) => handleAddCategory(item._id, e.target.value)} 
                                                className='outline-none border-none placeholder:text-sm placeholder:font-[300]' 
                                                placeholder='Enter category title...' 
                                                />
                                            <MdDelete 
                                                size={25} 
                                                onClick={() => {
                                                    setCategories((prevCategory) => 
                                                        prevCategory.filter((i) => i._id !== item._id)
                                                    )
                                                }} 
                                                className='hover:bg-gray-200 cursor-pointer p-0.5 rounded-sm' 
                                                />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='flex justify-center'>
                                <TbCategoryPlus size={26} onClick={newCategoriesHandler} className='cursor-pointer hover:text-dark-grass-green rounded-sm' />
                            </div>
                        </div>

                        <div className={`absolute bottom-4 right-4 bg-dark-green text-white text-sm w-30 hover:bg-dark-grass-green py-1.5 rounded-sm text-center ${areCategoriesUnchanged(data.layout?.categories, categories) || isAnyCategoryTitleEmpty(categories) || isAddingCategory ? "!cursor-not-allowed bg-gray-400 hover:bg-gray-400" : "!cursor-pointer"}`} onClick={areCategoriesUnchanged(data.layout?.categories, categories) || isAnyCategoryTitleEmpty(categories) ? () => null : editCategoriesHandler }>{isAddingCategory ? "Saving..." : "Save"}</div>
                    </div>
                )
            }
        </div>
    )
}

export default CategoryContainer