import Button from '@mui/material/Button';
import clickButton from "../../tollbar/function/clickButton";
import {useSelector, useDispatch} from "react-redux";

interface Props {
  variant:  'contained' | 'outlined' | 'text',
  text: string,
  color?: string
}

function AbstractButton(props: Props) {
  const dispatch=useDispatch()
  const state=useSelector((state:  any)=>state)
  function clickTollbarButton(button: any) {
    clickButton.call({dispatch, state},button)
  }
  return (<Button onClick={clickTollbarButton} variant={props.variant}>{props.text}</Button>)
}

export default AbstractButton
