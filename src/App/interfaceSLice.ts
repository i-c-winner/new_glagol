import { createSlice } from "@reduxjs/toolkit";
import { toolbarButtonsCenter, toolbarButtonsLeft, toolbarButtonsRight } from "./constants";
export type StateInterfaceSlice = {
  interfaceSLice: {
    toolbarButtonsCenter: [...string[]]
    toolbarButtonsLeft: [...string[]]
    toolbarButtonsRight: [...string[]]
  }
}
const interfaceSlice = createSlice({
  name: 'interface',
  initialState: {
    toolbarButtonsCenter,
    toolbarButtonsLeft,
    toolbarButtonsRight
  },
  reducers: {
    addToolbarButtonsCenter: (state, action) => {
      state.toolbarButtonsCenter.push(action.payload)
    }
  }
})


export const { addToolbarButtonsCenter } = interfaceSlice.actions
export default interfaceSlice.reducer

