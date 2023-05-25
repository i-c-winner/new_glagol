import { configureStore } from '@reduxjs/toolkit'
import sliceRoom from "../components/bigScreen/sliceRoom";
import sliceConfig from "../App/sliceConfig";
import thunk from "redux-thunk";
export default configureStore({
  reducer: {sliceRoom, sliceConfig, s},
  middleware: [thunk]
})
