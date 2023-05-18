import {createSlice} from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: 'roomName',
  initialState: {
    roomName: ''
  },
  reducers: {
    changeRoom: (state, action)=>{
      state.roomName=action.payload;
    }
  }
})
export const {changeRoom}=roomSlice.actions
export default roomSlice.reducer
