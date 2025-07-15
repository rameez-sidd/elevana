import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCourseInfo, setBenefits, setPrerequisites, setCourseContentData, setCourseData, setEditingMode } from '../redux/features/courses/courseCreationSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Categories from '@/components/Admin/Categories/Categories';

const useGetCourseForEdit = (courseId) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            if (!courseId) return;

            try {
                setLoading(true);
                setError(null);
                
                const response = await axios.get(`${import.meta.env.VITE_PUBLIC_SERVER_URI}/get-course-for-edit/${courseId}`, {
                    withCredentials: true
                });

                if (response.data.success) {
                    setData(response.data.course);
                    
                    const { name, description, price, estimatedPrice, tags, level, demoUrl, thumbnail, categories, benefits, prerequisites, courseData: courseContent } = response.data.course;
                    
                    // Set editing mode
                    dispatch(setEditingMode({ isEditing: true, courseId }));

                    // Set course info
                    dispatch(setCourseInfo({
                        name,
                        description,
                        price,
                        estimatedPrice,
                        categories,
                        tags,
                        level,
                        demoUrl,
                        thumbnail: thumbnail?.url || ""
                    }));

                    // Set benefits
                    dispatch(setBenefits(benefits || []));

                    // Set prerequisites
                    dispatch(setPrerequisites(prerequisites || []));

                    // Set course content data
                    dispatch(setCourseContentData(courseContent || []));

                    // Set complete course data
                    dispatch(setCourseData(response.data.course));

                    // Navigate to course creation page
                    navigate('/admin/admin-dashboard/create-course');
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to fetch course data');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId, dispatch, navigate]);

    return { data, loading, error };
};

export default useGetCourseForEdit; 