import { useDispatch, useSelector } from "react-redux";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import clickButton from "./function/clickButton";

function Tollbar() {
  const { tollbarButtons } = useSelector((state: any) => state.interfaceSLice)
  const dispatch=useDispatch()
  const state=useSelector((state: any)=>state)
function clickTollbarButton(button: any) {
  clickButton.call({dispatch, state},button)
}
  return (<div className="tollbar">
    <Stack spacing={2} direction="row">
      {tollbarButtons.map((button: string)=>{
        return  <Button onClick={clickTollbarButton} key={button} variant="contained">{button}</Button>
      })}
    </Stack>

    </div>)
}

export default Tollbar;
