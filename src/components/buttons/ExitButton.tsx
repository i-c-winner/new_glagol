import {useNavigate} from "react-router-dom";
import SvgIcon from "@mui/material/SvgIcon"
import Button from "@mui/material/Button";
import { IconExit } from "../icons";
import Glagol from '../../App/Glagol'


function CameraButton() {
const navigate=useNavigate()


  function getParams() {
    return {
      padding: "0",
      width: "86px",
      height: "44px",
      borderRadius: "3px",
      color: "red"
    }
  }

  function click() {
    Glagol.stopVideo()
    navigate('/exitPage')

  }

  return <Button  onClick={click} sx={{ padding: "0", color: 'orange' }}>
    <SvgIcon
      viewBox="0 0 86 44"
      sx={getParams()}
      children={IconExit}/>
  </Button>
}


export default CameraButton
