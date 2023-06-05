import { useSelector } from "react-redux";
import Stack from '@mui/material/Stack';
import AbstractIconButton from "../UI/button/AbstractIconButton";
import { CameraButton, MicrophoneButton, ChatButton, TitleButton, RiseHandButton } from "../buttons";
import ExitButton from "../buttons/ExitButton";

function Toolbar() {
  const buttons = [ {
    key: 'camera',
    component: <CameraButton/>
  }, {
    key: "microphone",
    component: <MicrophoneButton/>
  }, {
    key: "chat",
    component: <ChatButton/>
  }, {
    key: "titleView",
    component: <TitleButton/>
  }, {
    key: "riseHand",
    component: <RiseHandButton/>
  },
    {
      key: "exit",
      component: <ExitButton />
    } ]
  const {
          tollbarButtonsCenter,
          tollbarButtonsLeft,
          tollbarButtonsRight
        } = useSelector((state: any) => state.interfaceSLice)
  const leftButtons = buttons.filter((button) => {
    return tollbarButtonsLeft.includes(button.key)
  })
  const centerButtons = buttons.filter((button) => {
    return tollbarButtonsCenter.includes(button.key)
  })
  const rightButtons = buttons.filter((button) => {
    return tollbarButtonsRight.includes(button.key)
  })

  return (<div className="tollbar">
    <Stack spacing={2} direction="row" sx={{
      flexGrow: "1",
      width: "33%",
      justifyContent: "left"
    }}>
      {leftButtons.map((button) => {
        return <AbstractIconButton key={button.key}>{button.component}</AbstractIconButton>
      })}
    </Stack>
    <Stack spacing={2} direction="row" sx={{
      flexGrow: "1",
      width: "33%",
      justifyContent: "center"
    }}>
      {centerButtons.map((button) => {
        return <AbstractIconButton key={button.key}>{button.component}</AbstractIconButton>
      })}
    </Stack>
    <Stack spacing={2} direction="row" sx={{
      flexGrow: "1",
      width: "33%",
      justifyContent: "right"
    }}>
      {rightButtons.map((button) => {
        return <AbstractIconButton key={button.key}>{button.component}</AbstractIconButton>
      })}
    </Stack>

  </div>)
}

export default Toolbar;
