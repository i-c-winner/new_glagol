import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeAudioEnabled } from "../../App/configSlice";
import SvgIcon from "@mui/material/SvgIcon";
import microphone from "../icons/Microfon";
import Button from "@mui/material/Button";
import Glagol from "../../App/Glagol"
import { StateConfigSlice } from "../../App/configSlice";


function MicrophoneButton() {
  const { audioEnabled } = useSelector((state: StateConfigSlice) => state.configSlice)
  console.log(audioEnabled);

  const dispatch = useDispatch()
  const [toggled, setToggled] = useState(audioEnabled)
  console.log(toggled);

  function getParams() {
    const baseParams = {
      padding: "0",
      width: "40px",
      height: "40px",
      borderRadius: "3px"
    }
    if (toggled) {
      return {
        ...baseParams,
        color: '#00ff85'
      }
    } else {
      return {
        ...baseParams,
        color: "red",
        backgroundColor: "rgba(255, 255, 255, .16)"
      }
    }
  }

  function click() {
    dispatch(changeAudioEnabled())
    Glagol.changeAudio()
    setToggled(!toggled)
  }

  return <Button onClick={click} sx={{ padding: "0" }}>
    <SvgIcon
      viewBox="0 0 35 35"
      sx={getParams()}
      children={microphone} />
  </Button>
}


export default MicrophoneButton
