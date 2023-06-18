import Button from '@mui/material/Button';
import clickButton from "../../toolbar/function/clickButton";
import { useSelector, useDispatch } from "react-redux";

interface Props {
  variant: 'contained' | 'outlined' | 'text',
  text: string,
  color?: string
}

function AbstractButton(props: Props) {
  const dispatch = useDispatch()
  const state = useSelector((state: unknown) => state)
  function clickToolbarButton(button: any) {
    clickButton.call({ dispatch, state }, button)
  }
  return (<Button onClick={clickToolbarButton} variant={props.variant}>{props.text}</Button>)
}

export default AbstractButton
