import { changeVisibleChats } from "../../chat/chatSlice";
function clickButton(this: any, button: any) {
  switch (button.target.textContent) {
    case 'chat':
      this.dispatch(changeVisibleChats())
      break
    case 'settings':
      console.log('settings')
      break
    default:
      console.log(' default')
  }
}
export default clickButton
