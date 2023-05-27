import { createSlice } from "@reduxjs/toolkit";
const roomSlice = createSlice({
    name: 'room',
    initialState: {
        roomSource: false,
        remoteStreamsIsUpdated: false
    },
    reducers: {
        changeRoomSource: function (state) {
            state.roomSource = true;
        },
        wasUpdateRemoteStreams: function(state: any, action: any) {
            state.remoteStreamsIsUpdated=action.payload
        }
    }
});
export const {changeRoomSource, wasUpdateRemoteStreams} = roomSlice.actions;
export default roomSlice.reducer;
