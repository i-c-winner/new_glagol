import { createSlice } from "@reduxjs/toolkit";
import { tollbarButtons } from "./constants";

const interfaceSlice = createSlice({
  name: 'interface',
  initialState: {
    tollbarButtons
  },
  reducers: {
    addTollbarButton: (state, action) => {
      state.tollbarButtons.push(action.payload)
    }
  }
})


export const { addTollbarButton } = interfaceSlice.actions
export default interfaceSlice.reducer

