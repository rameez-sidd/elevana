import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeStep: 0,
  courseInfo: {
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    categories: "",
    demoUrl: "",
    thumbnail: "",
  },
  benefits: [{ title: "" }],
  prerequisites: [{ title: "" }],
  courseContentData: [
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section 1",
      videoLength: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ],
  courseData: {},
};

const courseCreationSlice = createSlice({
  name: 'courseCreation',
  initialState,
  reducers: {
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    setCourseInfo: (state, action) => {
      state.courseInfo = action.payload;
    },
    setBenefits: (state, action) => {
      state.benefits = action.payload;
    },
    setPrerequisites: (state, action) => {
      state.prerequisites = action.payload;
    },
    setCourseContentData: (state, action) => {
      state.courseContentData = action.payload;
    },
    setCourseData: (state, action) => {
      state.courseData = action.payload;
    },
    resetCourseCreation: (state) => {
      return initialState;
    },
  },
});

export const {
  setActiveStep,
  setCourseInfo,
  setBenefits,
  setPrerequisites,
  setCourseContentData,
  setCourseData,
  resetCourseCreation,
} = courseCreationSlice.actions;

export default courseCreationSlice.reducer; 