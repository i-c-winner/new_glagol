import { useState } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import * as Icons from '../../icons'
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import clickButton from "../../tollbar/function/clickButton";
import getColors from "../../tollbar/function/getColors";

interface Props {
  button: string
  icon: string,
  height?: string,
  width?: string,
}

interface Icons {
  IconChat: string,
  IconRiseHand: string,
  IconRiseHandler: string,
  IconCamera: string,
  IconMicrophon: string
}


function AbstractIconButton(props: Props) {
  const [ isToggled, setIsToggled ] = useState<boolean>(false)
  const {
          width  = "35px",
          height = "35px"
        } = props

  const dispatch = useDispatch()

  function action() {
    clickButton(dispatch, props.button)
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
      color: getColors(isToggled, props.button)
    }} viewBox={`0 0 ${width} ${height}`} children={Icons[props.icon as keyof typeof Icons]}></SvgIcon>
  </Button>
}

export default AbstractIconButton
