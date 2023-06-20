import React, { useEffect, useState, useRef, DOMElement, RefObject } from 'react';
import { useSelector } from "react-redux";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ChatsMessage from "./ChatsMessage";
import Glagol from "../../App/Glagol";

export type Message = {
  author: string, text: string, id: string
}

function Chat() {
  const chatRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const stateChat = useSelector((state: any) => state.chatSlice)
  const [chatsList, setChatsList] = useState(stateChat.chatsList)
  const [top, setTop] = useState<number>(0)
  useEffect(() => {
    setChatsList(stateChat.chatsList)
  }, [stateChat])
  useEffect(() => {
    if (listRef.current) setTop(listRef.current?.clientHeight)
    if (chatRef.current !== null) chatRef.current.scrollTop = top
  })

  function messageIsLocal(authorId: string) {
    return Glagol.xmpp.getId() === authorId
  }
  return (<div ref={chatRef} className="chats">
    <List sx={{
      width: '100%',
      maxWidth: 360,
      bgcolor: 'rgba(6,6,6,.16)',
      marginBottom: "180px"

    }}
      classes={{
        root: 'chats-list'
      }}
      ref={listRef}
    >
      {chatsList.map((message: Message, index: number) => {
        return (<ListItem sx={{
          margin: `${messageIsLocal(message.id) ? "10px auto 10px 5px" : "10px 5px 10px auto"}`,
          bgcolor: `${messageIsLocal(message.id) ? 'blue' : 'red'}`,
          width: "80%",
          borderRadius: 2,

        }} key={index} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={message.author}
            secondary={<React.Fragment>
              {message.text}
            </React.Fragment>}
          />
        </ListItem>
        )
      })}
    </List>
    <ChatsMessage />
  </div>)
}

export default Chat
