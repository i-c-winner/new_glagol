import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeVideoEnabled } from "../../App/configSlice";
import SvgIcon from "@mui/material/SvgIcon";
import camera from "../icons/Camera";
import Button from "@mui/material/Button";
import Glagol from "../../App/Glagol";


function CameraButton() {
  const { videoEnabled } = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const [ toggled, setToggled ] = useState(videoEnabled)

  function getParams() {
    const baseParams = {
      padding: "0",
      width: "40px",
      height: "40px",
      borderRadius: "3px"
    }
    if (!toggled) {
      return {
        ...baseParams,
        color: '#f0ff85'
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
    dispatch(changeVideoEnabled())
    setToggled(!toggled)
    Glagol.changeVisibleVideo()
  }

  return <Button onClick={click} sx={{ padding: "0" }}>
    <SvgIcon
      viewBox="0 0 35 35"
      sx={getParams()}
      children={camera}/>
  </Button>
}


export default CameraButton
