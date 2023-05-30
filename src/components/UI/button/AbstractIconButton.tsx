import SvgIcon from "@mui/material/SvgIcon";
interface Props {
  icon: JSX.Element,
  button: string
}
function AbstractIconButton (props: Props){
  return <SvgIcon children={props.icon}></SvgIcon>
}

export default AbstractIconButton
