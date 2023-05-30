import SvgIcon from "@mui/material/SvgIcon";
import * as Icons from '../../icons'
interface Props {
  button: string
  icon: string
}
interface Icons {
    IconChat: any,
    IconRiseHand: any
}


function AbstractIconButton (props: Props){
  return <SvgIcon children={Icons[props.icon as keyof typeof Icons]}></SvgIcon>
}

export default AbstractIconButton
