import { createSlice } from "@reduxjs/toolkit";
const roomSlice = createSlice({
    name: 'room',
    initialState: {
        roomSource: false
    },
    reducers: {
        changeRoomSource: function (state) {
            state.roomSource = true;
        }
    }
});
export const {changeRoomSource} = roomSlice.actions;
export default roomSlice.reducer;
