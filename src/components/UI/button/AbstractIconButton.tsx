
import SvgIcon from "@mui/material/SvgIcon";
import * as Icons from '../../icons'
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import clickButton from "../../tollbar/function/clickButton";

declare interface Props {
  button: string
  icon: string,
  height?: string,
  width?: string,
  color?: {
    isToggled?: string,
    isNotToggled?: string
  }
}

interface Icons {
  IconChat: string,
  IconRiseHand: string,
  IconRiseHandler: string,
  IconCamera: string,
  IconMicrophon: string
}


function AbstractIconButton(props: any) {


  // @ts-ignore
  return <div className="abstract-button" >
      {props.children}
  </div>
}

export default AbstractIconButton
