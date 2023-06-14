import { changeVisibleChats } from "../../chat/ChatSlice";
import { changeVideoEnabled } from "../../../App/configSlice";
import Glagol from "../../../App/Glagol";

type Params = {
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
      break
    case "camera":
      params.dispatch(changeVideoEnabled())
      Glagol.changeVisibleVideo()
      break
    default:
  }
}
export default clickButton
