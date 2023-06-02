import { useState } from "react";
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


function AbstractIconButton(props: Props) {
  const state=useSelector((state: any)=>state)
  const [ isToggled, setIsToggled ] = useState<boolean>(false)
  const {
          width  = "35",
          height = "35",
    button
        } = props

  const dispatch = useDispatch()

  function action() {
    clickButton({
      dispatch,
      button,
      state
    })
    setIsToggled(!isToggled)
  }

  return <Button
    sx={{
      bgcolor: `${!isToggled ? "" : "#23232340"}`,
      "&:hover": {
        bgcolor: "#23232360",
      }
    }}
    disableRipple={true}
    onClick={action}>
    <SvgIcon sx={{
      width,
      height,
      color: `${!isToggled ? props.color?.isNotToggled||"white": props.color?.isToggled||"white"}`
    }} viewBox={`0 0 ${width} ${height}`} children={Icons[props.icon as keyof typeof Icons]}></SvgIcon>
  </Button>
}

export default AbstractIconButton
