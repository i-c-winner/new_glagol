import { useSelector } from "react-redux";
import Stack from '@mui/material/Stack';
import AbstractButton from "../UI/button/AbstractButton";
import AbstractIconButton from "../UI/button/AbstractIconButton";




function Toolbar() {
  const { tollbarButtonsCenter, tollBarButtonsLeft } = useSelector((state: any) => state.interfaceSLice)
  return (<div className="tollbar">
    <Stack spacing={2} direction="row">
      {tollBarButtonsLeft.map((button: {
        name: string,
        icon: string
      }) => {
        return <AbstractIconButton key={button.name} icon={button.icon} button={button.name} />
      })}
    </Stack>
    {/*<Stack spacing={2} direction="row">*/}
    {/*  {tollbarButtonsCenter.map((button: string) => {*/}
    {/*    return <AbstractButton key={button.name} variant="contained" text={button.name}/>*/}
    {/*  })}*/}
    {/*</Stack>*/}

  </div>)
}

export default Toolbar;
