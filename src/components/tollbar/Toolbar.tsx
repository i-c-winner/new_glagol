import { useSelector } from "react-redux";
import Stack from '@mui/material/Stack';
import AbstractIconButton from "../UI/button/AbstractIconButton";



type Button = {
  name: string, icon: string, color:{isToggled: string, isNotToggled: string}
}

function Toolbar() {
  const {
          tollbarButtonsCenter,
          tollbarButtonsLeft,
          tollbarButtonsRight
        } = useSelector((state: any) => state.interfaceSLice)
  return (<div className="tollbar">
    <Stack spacing={2} direction="row">
      {tollbarButtonsLeft.map((button: Button) => {
        return <AbstractIconButton key={button.name} color={button.color} icon={button.icon} button={button.name}/>
      })}
    </Stack>
    <Stack spacing={2} direction="row">
      {tollbarButtonsCenter.map((button: Button) => {
        return <AbstractIconButton key={button.name} color={button.color} icon={button.icon} button={button.name}/>
      })}
    </Stack>
    <Stack spacing={2} direction="row">
      {tollbarButtonsRight.map((button: Button) => {
        return <AbstractIconButton key={button.name} color={button.color} icon={button.icon} button={button.name}/>
      })}
    </Stack>
  </div>)
}

export default Toolbar;
