import { useRef } from "react";
import { TextareaAutosize } from "@mui/material";
import styled from "@emotion/styled";
import SvgIcon from "@mui/material/SvgIcon";
import { IconSend } from "../icons";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { addChatStrophe } from "./ChatSlice";


function ChatsMessage() {
  const dispatch = useDispatch()
  const { displayName } = useSelector((state: any) => state.configSlice)
  const textRef = useRef<any>('')

  function changeMessage(event: any) {
    textRef.current.value = event.target.value;
  }

  function sendMessage() {
    dispatch(addChatStrophe({
      author: displayName,
      text: textRef.current.value
    }))
  }

  const TextArea = styled(TextareaAutosize)(() => {
    return `
width: 100%;
margin: 0 auto;
padding: 10px 5px;
border-radius: 5px
`

  })
  return <div className="chat-message">
    <TextArea ref={textRef} onChange={changeMessage} placeholder="Введите сообщение"/>
    <Button sx={{
      color: "white",
      "&:hover": {
        color: "#00ff85",
        cursor: "pointer"
      }
    }}
            className="send__icon"
            onClick={sendMessage}>
      <SvgIcon children={IconSend}/>
    </Button>
  </div>


}


export default ChatsMessage;
