import {createSlice} from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: 'config',
  initialState: {
    createdRoom: false,
    roomName: undefined,

  },
  reducers: {
    changeRoomStatus: (state, action) => {
      state.createdRoom = action.payload
    },
    changeRoomName: (state, action)=>{
      state.roomName=action.payload
    }
  }
})

export const {changeRoomStatus, changeRoomName} = configSlice.actions
export default configSlice.reducer
