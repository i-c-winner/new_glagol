import { createSlice } from "@reduxjs/toolkit";
const roomSlice = createSlice({
    name: 'room',
    initialState: {
        roomSource: false,
        remoteStreamsWereUpdated: false
    },
    reducers: {
        changeRoomSource: function (state) {
            state.roomSource = true;
        },
        wasUpdateRemoteStreams: function(state, action) {
            state.remoteStreamsWereUpdated=action.payload
        }
    }
});
export const {changeRoomSource, wasUpdateRemoteStreams} = roomSlice.actions;
export default roomSlice.reducer;
