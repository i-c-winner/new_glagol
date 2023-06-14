import { createSlice } from "@reduxjs/toolkit";
export type StateRoomSlice = {
    roomSlice: {
        roomSource: boolean
        remoteStreamsWereUpdated: boolean,
        localStream: any
    }
}
const roomSlice = createSlice({
    name: 'room',
    initialState: {
        roomSource: false,
        remoteStreamsWereUpdated: false,
        localStream: null
    },
    reducers: {
        changeRoomSource: function (state) {
            state.roomSource = true;
        },
        wasUpdateRemoteStreams: function (state, action) {
            state.remoteStreamsWereUpdated = action.payload
        },
        updateLocalStream: function (state, action) {
            state.localStream = action.payload
        }
    },

});

export const { changeRoomSource, wasUpdateRemoteStreams, updateLocalStream } = roomSlice.actions;
export default roomSlice.reducer;

