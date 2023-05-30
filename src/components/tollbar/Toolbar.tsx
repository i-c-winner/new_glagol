import { useSelector } from "react-redux";
import Stack from '@mui/material/Stack';
import AbstractButton from "../UI/button/AbstractButton";
import {IconChat} from "../icons";
import AbstractIconButton from "../UI/button/AbstractIconButton";




function Toolbar() {
  const { tollbarButtonsCenter, tollBarButtonsLeft } = useSelector((state: any) => state.interfaceSLice)
  return (<div className="tollbar">
    <Stack spacing={2} direction="row">
      {tollBarButtonsLeft.map((button: string) => {
        return <AbstractIconButton icon={IconChat} button={button} />
      })}
    </Stack>
    <Stack spacing={2} direction="row">
      {tollbarButtonsCenter.map((button: string) => {
        return <AbstractButton key={button} variant="contained" text={button}/>
      })}
    </Stack>

  </div>)
}

export default Toolbar;
