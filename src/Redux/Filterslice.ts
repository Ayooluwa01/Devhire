import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobType: null,
  jobExperience: null,
  jobfunctions: [] as string[],
  salaryRange: null,
};

const Filterslice = createSlice({
  name: "filterslice",
  initialState,
  reducers: {
    setJob: (state, action) => {
      state.jobType = action.payload;
    },
    setJobExperiences: (state, action) => {
      state.jobExperience = action.payload;
    },
    setjobfunction: (state, action) => {
      state.jobfunctions = [...state.jobfunctions, action.payload];
    },
    setsalaryRanges: (state, action) => {
      state.salaryRange = action.payload;
    },
  },
});

export const { setJob, setJobExperiences, setjobfunction, setsalaryRanges } =
  Filterslice.actions;
export default Filterslice.reducer;
