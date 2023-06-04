import { useSelector } from "react-redux";
import Stack from '@mui/material/Stack';
import AbstractIconButton from "../UI/button/AbstractIconButton";
import CameraButton from "../buttons/CameraButton";
import MicrophoneButton from "../buttons/MicrophoneButton";
import ChatButton from "../buttons/ChatButton";
import TitleButton from "../buttons/TitleButton";



function Toolbar() {
  const buttons = [ {
    key: 'camera',
    component: <CameraButton/>
  },
    {
      key: "microphone",
      component: <MicrophoneButton />
    },{
    key: "chat",
      component: <ChatButton />
    },
    {
      key: "titleView",
      component: <TitleButton/>
    }]
  const {
          tollbarButtonsCenter,
          tollbarButtonsLeft,
          tollbarButtonsRight
        } = useSelector((state: any) => state.interfaceSLice)
  const leftButtons = buttons.filter((button) => {
    console.log(button.key, tollbarButtonsLeft)
  return tollbarButtonsLeft.includes(button.key)
  })
  const centerButtons = buttons.filter((button) => {
    console.log(button.key, tollbarButtonsCenter)
    return tollbarButtonsCenter.includes(button.key)
  })
  console.log(leftButtons)
  return (<div className="tollbar">
    <Stack spacing={2} direction="row" sx={{flexGrow: "1"}}>
      {leftButtons.map((button) => {
        return <AbstractIconButton key={button.key}>{button.component}</AbstractIconButton>
      })}
    </Stack>
    <Stack spacing={2} direction="row" sx={{flexGrow: "1"}}>
      {centerButtons.map((button) => {
        return <AbstractIconButton key={button.key}>{button.component}</AbstractIconButton>
      })}
    </Stack>

  </div>)
}

export default Toolbar;
