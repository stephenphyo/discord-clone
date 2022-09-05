import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'app/slices/userSlice';
import channelReducer from 'app/slices/channelSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        channel: channelReducer,
    },
});
