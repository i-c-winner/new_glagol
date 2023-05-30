import { createSlice } from "@reduxjs/toolkit";
import { tollbarButtonsCenter, tollbarButtonsLeft, tollbarButtonsRight } from "./constants";

const interfaceSlice = createSlice({
  name: 'interface',
  initialState: {
    tollbarButtonsCenter,
    tollbarButtonsLeft,
    tollbarButtonsRight
  },
  reducers: {
    addTollbarButtonsCenter: (state, action) => {
      state.tollbarButtonsCenter.push(action.payload)
    }
  }
})


export const { addTollbarButtonsCenter } = interfaceSlice.actions
export default interfaceSlice.reducer

