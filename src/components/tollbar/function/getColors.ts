function getColors(isTogled: boolean, button: string) {
  switch (button) {
    case "camera" :
      return isTogled? '#ec4939': '#00ff85'
    case "microphone" :
      return isTogled? '#ec4939': '#00ff85'
    default:
      return "white"
  }
}
export default getColors;
