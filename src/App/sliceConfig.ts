import {createSlice} from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: 'config',
  initialState: {
    displayName: false,
    roomName: false,
    XMPPConnected: false,
    iCreaterRoom: false
  },
  reducers: {
    changeDisplayName: (state, action) => {
      state.displayName = action.payload
    },
    changeRoomName: (state, action) => {
      state.roomName = action.payload
    },
    changeXMPPConnected: (state, action) => {
      state.XMPPConnected = action.payload
    },
    changeICreaterRoom: (state, action) => {
      state.iCreaterRoom = action.payload
    }
  }
})

export const {changeDisplayName, changeRoomName, changeXMPPConnected, changeICreaterRoom} = configSlice.actions
export default configSlice.reducer
