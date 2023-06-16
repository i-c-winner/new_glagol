import { createSlice } from "@reduxjs/toolkit";

export type StateChatSlice = {
  chatSlice: {
    chatsList: {
      author: string,
      text: string,
      id: string
    }[],
    visibleChats: boolean
  }

}

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatsList: [],
    visibleChats: false
  },

  reducers: {
    addChatStrophe: (state, action) => {
      state.chatsList.push(action.payload)
    },
    changeVisibleChats: ((state) => {
      state.visibleChats = !state.visibleChats
    })
  }
})

export const { addChatStrophe, changeVisibleChats } = chatSlice.actions

export default chatSlice.reducer
