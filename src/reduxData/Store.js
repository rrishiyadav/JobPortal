import { configureStore } from '@reduxjs/toolkit'
import authSlice from './AuthSlice'
import hrSlice from './HrSlice'
import cateSlice from './CategorySlice'
import updateSlice from './UpdateSlice'
import candidateSlice from './CandidateSlice'
import AppliedJobsSlice from './AppliedJobsSlice'
import JobSlice from './JobSlice'
import CanProfile from './CanProfile'

const store = configureStore({
    reducer: {
        authInfo : authSlice,
        hrInfo : hrSlice,
        cateInfo : cateSlice,
        updateInfo : updateSlice,
        jobInfo : JobSlice,
        candidateInfo : candidateSlice,
        appliedJobInfo : AppliedJobsSlice,
        canproinfo: CanProfile
    }
    })

export default store;