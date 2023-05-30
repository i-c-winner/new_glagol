import { changeVisibleChats } from "../../chat/chatSlice";
function clickButton(dispatch: any, buttonName: any) {
  switch (buttonName) {
    case 'chat':
      dispatch(changeVisibleChats())
      break
    case 'settings':
      console.log('settings')
      break
    default:
      console.log(' default')
  }
}
export default clickButton
