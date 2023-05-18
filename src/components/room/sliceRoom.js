import { createSlice } from "@reduxjs/toolkit";
var roomSlice = createSlice({
    name: 'roomName',
    initialState: {
        roomName: ''
    },
    reducers: {
        changeRoom: function (state, action) {
            state.roomName = action.payload;
        }
    }
});
export var changeRoom = roomSlice.actions.changeRoom;
export default roomSlice.reducer;
