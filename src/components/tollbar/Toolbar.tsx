import { useSelector } from "react-redux";
import Stack from '@mui/material/Stack';
import AbstractButton from "../UI/button/AbstractButton";

function Toolbar() {
  const { tollbarButtons } = useSelector((state: any) => state.interfaceSLice)

  return (<div className="tollbar">
    <Stack spacing={2} direction="row">
      {tollbarButtons.map((button: string)=>{
        return  <AbstractButton  key={button} variant="contained" text={button}/>
      })}
    </Stack>

    </div>)
}

export default Toolbar;
