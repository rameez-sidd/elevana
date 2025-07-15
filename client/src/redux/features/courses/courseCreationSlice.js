import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courseInfo: {
    name: "",
    description: "",
    categories: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    categories: "",
    demoUrl: "",
    thumbnail: "",
    demoFileName: "",
  },
  benefits: [{ title: "" }],
  prerequisites: [{ title: "" }],
  courseContentData: [
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
      fileName: "",
    },
  ],
  courseData: {},
  isEditing: false,
  editingCourseId: "",
};

const courseCreationSlice = createSlice({
  name: 'courseCreation',
  initialState,
  reducers: {
    setCourseInfo: (state, action) => {
      state.courseInfo = { ...state.courseInfo, ...action.payload };
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
    setDemoFileName: (state, action) => {
      state.courseInfo.demoFileName = action.payload;
    },
    setContentFileName: (state, action) => {
      const { index, fileName } = action.payload;
      state.courseContentData[index].fileName = fileName;
    },
    setContentDuration: (state, action) => {
      const { index, videoLength } = action.payload;
      state.courseContentData[index].videoLength = videoLength;
    },
    setEditingMode: (state, action) => {
      state.isEditing = action.payload.isEditing;
      state.editingCourseId = action.payload.courseId;
    },
    resetCourseCreation: () => initialState,
  },
});

export const {
  setCourseInfo,
  setBenefits,
  setPrerequisites,
  setCourseContentData,
  setCourseData,
  setDemoFileName,
  setContentFileName,
  setEditingMode,
  resetCourseCreation,
  setContentDuration
} = courseCreationSlice.actions;

export default courseCreationSlice.reducer; 