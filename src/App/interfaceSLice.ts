import { createSlice } from "@reduxjs/toolkit";
import { tollbarButtonsCenter, tollBarButtonsLeft } from "./constants";

const interfaceSlice = createSlice({
  name: 'interface',
  initialState: {
    tollbarButtonsCenter,
    tollBarButtonsLeft
  },
  reducers: {
    addTollbarButtonsCenter: (state, action) => {
      state.tollbarButtonsCenter.push(action.payload)
    }
  }
})


export const { addTollbarButtonsCenter } = interfaceSlice.actions
export default interfaceSlice.reducer

