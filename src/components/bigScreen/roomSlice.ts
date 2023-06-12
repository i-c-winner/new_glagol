import { createSlice } from "@reduxjs/toolkit";
export type StateRoomSlice = {
    roomSlice: {
        roomSource: boolean
        remoteStreamsWereUpdated: boolean
    }
}
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
        wasUpdateRemoteStreams: function (state, action) {
            state.remoteStreamsWereUpdated = action.payload
        }
    }
});
export const { changeRoomSource, wasUpdateRemoteStreams } = roomSlice.actions;
export default roomSlice.reducer;
