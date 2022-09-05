import { createSlice } from "@reduxjs/toolkit";

export const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    channelId: null,
    channelName: null
  },
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    }
  }
});

export const { setChannelInfo } = channelSlice.actions;

export const selectChannel = (state) => state.channel;

export default channelSlice.reducer;