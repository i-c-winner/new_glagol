import { createSlice } from "@reduxjs/toolkit";

export type StateConfigSlice = {
  configSlice: {
    displayName: string,
    roomName: string,
    XMPPConnected: boolean,
    iCreaterRoom: boolean,
    hasRoomName: boolean,
    hasDisplayName: boolean,
    videoEnabled: boolean,
    audioEnabled: boolean,
  }
}

const configSlice = createSlice({
  name: 'config',
  initialState: {
    displayName: '',
    roomName: '',
    XMPPConnected: false,
    iCreaterRoom: false,
    hasRoomName: false,
    hasDisplayName: false,
    videoEnabled: true,
    audioEnabled: true,
  },
  reducers: {
    changeDisplayName: (state, action) => {
      state.displayName = action.payload
    },
    changeHasDisplayName: (state, action) => {
      state.hasDisplayName = action.payload
    },
    changeRoomName: (state, action) => {
      state.roomName = action.payload
    },
    changeHasRoomName: (state, action) => {
      state.hasRoomName = action.payload
    },
    changeXMPPConnected: (state, action) => {
      state.XMPPConnected = action.payload
    },
    changeICreaterRoom: (state, action) => {
      state.iCreaterRoom = action.payload
    },
    changeVideoEnabled: (state) => {
      state.videoEnabled = !state.videoEnabled
    },
    changeAudioEnabled: (state) => {
      state.audioEnabled = !state.audioEnabled
    },
  }
})

export const {
  changeDisplayName,
  changeRoomName,
  changeXMPPConnected,
  changeICreaterRoom,
  changeHasRoomName,
  changeHasDisplayName,
  changeAudioEnabled,
  changeVideoEnabled,
} = configSlice.actions
export default configSlice.reducer
