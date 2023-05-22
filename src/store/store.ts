import { configureStore } from '@reduxjs/toolkit'
import sliceRoom from "../components/bigScreen/sliceRoom";
import sliceConfig from "../App/sliceConfig";

export default configureStore({
  reducer: {sliceRoom, sliceConfig},
})
