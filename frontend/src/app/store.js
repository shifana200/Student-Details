import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import adminReducer from '../features/admin/adminSlice';
import listSlice from '../features/createSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    todo:listSlice,

  },
});

export default store;
