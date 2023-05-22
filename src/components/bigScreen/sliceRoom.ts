import { createSlice } from "@reduxjs/toolkit";
const roomSlice = createSlice({
    name: 'room',
    initialState: {
        roomSource: undefined
    },
    reducers: {
        changeRoomSource: function (state, action) {
            state.roomSource = action.payload;
        }
    }
});
export const {changeRoomSource} = roomSlice.actions;
export default roomSlice.reducer;
