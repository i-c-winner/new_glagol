import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: 'config', initialState: {
    displayName: '', roomName: '', XMPPConnected: false, iCreaterRoom: false, hasRoomName: false, hasDisplayName: false,
  }, reducers: {
    changeDisplayName: (state, action) => {
      state.displayName = action.payload
    }, changeHasDisplayName: (state, action) => {
      state.hasDisplayName = action.payload
    }, changeRoomName: (state, action) => {
      state.roomName = action.payload
    }, changeHasRoomName: (state, action) => {
      state.hasRoomName = action.payload
    }, changeXMPPConnected: (state, action) => {
      state.XMPPConnected = action.payload
    }, changeICreaterRoom: (state, action) => {
      state.iCreaterRoom = action.payload
    }
  }
})

export const {
               changeDisplayName,
               changeRoomName,
               changeXMPPConnected,
               changeICreaterRoom,
               changeHasRoomName,
               changeHasDisplayName
             } = configSlice.actions
export default configSlice.reducer
