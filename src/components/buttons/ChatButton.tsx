import { useState } from "react";
import { useDispatch } from "react-redux";
import {changeVisibleChats} from "../chat/ChatSlice";
import SvgIcon from "@mui/material/SvgIcon";
import {IconChat} from "../icons";
import Button from "@mui/material/Button";


function ChatButton() {
  const dispatch = useDispatch()
  const [ toggled, setToggled ] = useState(false)

  function getParams() {
    const baseParams = {
      padding: "0",
      width: "40px",
      height: "40px",
      borderRadius: "3px",
      color: "white",
    }
    if (!toggled) {
      return {
        ...baseParams,
      }
    } else {
      return {
        ...baseParams,
        backgroundColor: "rgba(255, 255, 255, .16)"

      }
    }
  }

  function click() {
    dispatch(changeVisibleChats())
    setToggled(!toggled)
  }

  return <Button onClick={click} sx={{ padding: "0" }}>
    <SvgIcon
      viewBox="0 0 35 35"
      sx={getParams()}
      children={IconChat}/>
  </Button>
}


export default ChatButton
