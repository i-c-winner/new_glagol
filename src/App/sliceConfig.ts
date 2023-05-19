import {createSlice} from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: 'config',
  initialState: {
    displayName: false,
    roomName: '',
    XMPPConnected: false,
    iCreaterRoom: false,
    hasRoomName: ''
  },
  reducers: {
    changeDisplayName: (state, action) => {
      state.displayName = action.payload
    },
    changeRoomName: (state, action) => {
      state.roomName = action.payload
    },
    changeHasRoomName: (state, action)=> {
      state.hasRoomName = action.payload
    },
    changeXMPPConnected: (state, action) => {
      state.XMPPConnected = action.payload
    },
    changeICreaterRoom: (state, action) => {
      state.iCreaterRoom = action.payload
    }
  }
})

export const {changeDisplayName, changeRoomName, changeXMPPConnected, changeICreaterRoom, changeHasRoomName} = configSlice.actions
export default configSlice.reducer
