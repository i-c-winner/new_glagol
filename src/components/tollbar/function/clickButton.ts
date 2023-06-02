import { changeVisibleChats } from "../../chat/chatSlice";
import {changeAudioEnabled, changeVideoEnabled} from "../../../App/configSlice";
import Glagol from "../../../App/Glagol";

type Params= {
  dispatch: Function,
  button: string,
  state?: any
}
function clickButton(params: Params) {

  switch (params.button) {
    case "chat":
      params.dispatch(changeVisibleChats())
      break
    case "settings":
      console.log('settings')
      break
    case "camera":
      params.dispatch(changeVideoEnabled())
      Glagol.changeVisibleVideo()
      break
    default:
      console.log(' default')
  }
}
export default clickButton
