import { configureStore } from '@reduxjs/toolkit'
import roomSlice from "../components/bigScreen/roomSlice";
import configSlice from "../App/configSlice";
import interfaceSLice from "../App/interfaceSLice";
import chatSlice from "../components/chat/chatSlice";
import thunk from "redux-thunk";
export default configureStore({
  reducer: {roomSlice, configSlice, interfaceSLice, chatSlice},
  middleware: [thunk]
})
