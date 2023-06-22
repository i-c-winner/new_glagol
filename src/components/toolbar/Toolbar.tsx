import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Stack from '@mui/material/Stack';
import AbstractIconButton from "../UI/button/AbstractIconButton";
import { CameraButton, MicrophoneButton, ChatButton, TitleButton, RiseHandButton } from "../buttons";
import ExitButton from "../buttons/ExitButton";
import { StateInterfaceSlice } from "../../App/interfaceSLice";
import { Link } from "react-router-dom";

function Toolbar() {
  const buttons = [{
    key: 'camera',
    component: <CameraButton />
  }, {
    key: "microphone",
    component: <MicrophoneButton />
  }, {
    key: "chat",
    component: <ChatButton />
  }, {
    key: "titleView",
    component: <TitleButton />
  }, {
    key: "riseHand",
    component: <RiseHandButton />
  }, {
    key: "exit",
    component: <ExitButton />
  }]
  const {
    toolbarButtonsCenter,
    toolbarButtonsLeft,
    toolbarButtonsRight
  } = useSelector((state: StateInterfaceSlice) => state.interfaceSLice)
  const [timer, setTimer] = useState<any>(0)
  const [isVisibleToolbox, setIsVisibleToolbox] = useState(true)

  const leftButtons = buttons.filter((button) => {
    return toolbarButtonsLeft.includes(button.key)
  })
  const centerButtons = buttons.filter((button) => {
    return toolbarButtonsCenter.includes(button.key)
  })
  const rightButtons = buttons.filter((button) => {
    return toolbarButtonsRight.includes(button.key)
  })

  function switchOnVisibleToolbox() {
    setIsVisibleToolbox(true)
  }

  function swithOffVisibleToolbox() {
    setTimer(() => {
      return setTimeout(() => {
        setIsVisibleToolbox(false)
      }, 2000)
    })
  }

  useEffect(() => {
    return (() => {
      clearTimeout(timer)
    })
  }, [timer])
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisibleToolbox(false)
    }, 3000)
    return (() => {
      clearTimeout(timer)
    })
  }, [])
  return (<div onMouseOver={switchOnVisibleToolbox} onMouseLeave={swithOffVisibleToolbox}
    className="toolbar">
    {isVisibleToolbox ? <div className="toolbar__wrapper">
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
    </div> : null}
    <Link to="/whiteboard">whiteboard</Link>
  </div >)
}

export default Toolbar;
