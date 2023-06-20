import { useRef, useState } from "react";
import { TextareaAutosize, Box } from "@mui/material";
import styled from "@emotion/styled";
import SvgIcon from "@mui/material/SvgIcon";
import { IconSend } from "../icons";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { StateConfigSlice } from "../../App/configSlice";
import Glagol from "../../App/Glagol";
import { getTextButton } from "./functions";
import type { Message } from "./Chat";


function ChatsMessage() {
  const { displayName } = useSelector((state: StateConfigSlice) => state.configSlice)
  const textRef = useRef<HTMLTextAreaElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const messages = useSelector((state: any) => state.chatSlice)
  function changeMessage(event: any) {
    if (typeof textRef.current !== null) {
      if (textRef.current !== null) textRef.current.value = event.target.value;
    }
  }

  function sendMessage() {
    if (textRef.current !== null) {
      Glagol.xmpp.messageToAllOccupants({
        author: displayName,
        id: Glagol.xmpp.getId(),
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
  function selectingFile(event: any) {
    console.log(event.target.files);
    setSelectedFile(event.target.files)
  }
  function sendFile() {
    setSelectedFile(null)
    Glagol.sendFile(selectedFile)
  }
  function saveMessage() {
    let text = ''
    let author = ''
    messages.chatsList.map((message: Message) => {
      function getAuthor() {
        if (message.author !== author) {
          author = message.author
          return "_____________________________________" + "\n" + "Автор: " + message.author + "\n"
        }
        return ''
      }
      text = text + getAuthor() + "Сообщение: " + message.text + "\n\n"
    })
    const blob = new Blob([text])
    const virtualButton = document.createElement('a')
    virtualButton.setAttribute('href', URL.createObjectURL(blob))
    virtualButton.setAttribute('download', 'chat.doc')
    virtualButton.click()
  }

  return <div className="chat-message">
    <div className="inputs">
      <input onChange={selectingFile} className="input-file" type="file" multiple id="file" />
      <label className="input-file__label" htmlFor="file">{getTextButton(selectedFile)}</label>
      <Button sx={{
        color: "white",
        "&:hover": {
          color: "#00ff85",
          cursor: "pointer"
        }
      }}
        className="send__icon"
        onClick={sendFile}>
        <SvgIcon children={IconSend} />
      </Button>
    </div>

    <Box sx={{
      display: "flex",
      margin: "20px 0",

    }}>
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
    </Box>
    <Button sx={{
      color: "white",
      background: "grey",
      marginBottom: "10px",
      "&:hover": {
        color: "black",
        background: "red",
        cursor: "pointer"
      }
    }} onClick={saveMessage}>Сохранить чат</Button>
  </div>
}


export default ChatsMessage;
