import {createSlice} from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: 'config',
  initialState: {
    displayName: false,
    roomName: false,
    room: false,
    XMPPConnected: false
  },
  reducers: {
    changeDisplayName: (state, action) => {
      state.displayName = action.payload
    },
    changeRoomName: (state, action) => {
      state.roomName = action.payload
    },
    changeRoom: (state, action) => {
      state.room = action.payload
    },
    changeXMPPConnected: (state, action) => {
      state.XMPPConnected = action.payload
    }
  }
})

export const {changeDisplayName, changeRoomName, changeRoom, changeXMPPConnected} = configSlice.actions
export default configSlice.reducer
