import { useRef } from "react";
import { TextareaAutosize } from "@mui/material";
import styled from "@emotion/styled";
import SvgIcon from "@mui/material/SvgIcon";
import { IconSend } from "../icons";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { StateConfigSlice } from "../../App/configSlice";
import Glagol from "../../App/Glagol";


function ChatsMessage() {
  const { displayName } = useSelector((state: StateConfigSlice) => state.configSlice)
  const textRef = useRef<HTMLTextAreaElement | null>(null)

  function changeMessage(event: any) {
    if (typeof textRef.current !== null) {
      if (textRef.current !== null) textRef.current.value = event.target.value;
    }
  }

  function sendMessage() {
    if (textRef.current !== null) {
      Glagol.xmpp.messageToAllOccupants({
        author: displayName,
        text: textRef.current.value
      })
    }
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
    <TextArea ref={textRef} onChange={changeMessage} placeholder="Введите сообщение" />
    <Button sx={{
      color: "white",
      "&:hover": {
        color: "#00ff85",
        cursor: "pointer"
      }
    }}
      className="send__icon"
      onClick={sendMessage}>
      <SvgIcon children={IconSend} />
    </Button>
  </div>


}


export default ChatsMessage;
