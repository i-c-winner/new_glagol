import SvgIcon from "@mui/material/SvgIcon";
import * as Icons from '../../icons'
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import clickButton from "../../tollbar/function/clickButton";

interface Props {
  button: string
  icon: string,
  height: string,
  width: string,
}

interface Icons {
  IconChat: any,
  IconRiseHand: any
}


function AbstractIconButton(props: Props) {
  const {
          width  = "35px",
          height = "35px"
        } = props

  const dispatch = useDispatch()
  function action() {
    clickButton(dispatch, props.button)
  }

  return <Button onClick={action}>
      <SvgIcon sx={{
        width,
        height
      }} viewBox={`0 0 ${width} ${height}`} children={Icons[props.icon as keyof typeof Icons]}></SvgIcon>
    </Button>
}

export default AbstractIconButton
