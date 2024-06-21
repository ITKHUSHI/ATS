import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  currentJob: null,
  status: 'idle',
  error: null,
}

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setCurrentJob: (state, action) => {
      state.currentJob = action.payload;
    },
    applyJobStart: (state) => {
      state.status = 'loading'
    },
    applyJobFailed: (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    },
    applyJobSuccess: (state, action) => {
      state.status = 'succeeded';
      state.jobs = action.payload;
    },
    jobCreateStart: (state, action) => {
      state.jobs.push(action.payload);
    },
  }
})

export const { setCurrentJob, applyJobStart, applyJobFailed, applyJobSuccess, jobCreateStart } = jobSlice.actions;
export default jobSlice.reducer;
