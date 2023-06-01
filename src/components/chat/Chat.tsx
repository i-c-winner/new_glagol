import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ChatsMessage from "./ChatsMessage";


type Chat = {
  author: string, text: string
}

function Chat() {
  const chatRef = useRef<any>()
  const listRef = useRef<any>()
  const stateChat = useSelector((state: any) => state.chatSlice)
  const {displayName}=useSelector((state: any)=> state.configSlice)
  const [ chatsList, setChatsList ] = useState(stateChat.chatsList)
  const [ top, setTop ] = useState<any>(0)
  useEffect(() => {
    setChatsList(stateChat.chatsList)
  }, [ stateChat ])
  useEffect(() => {
    setTop(listRef.current?.clientHeight)
    chatRef.current.scrollTop = top
  })

  function messageIsLocal(author: string) {
    return displayName===author
  }
  return (<div ref={chatRef} className="chats">
    <List sx={{
      width: '100%',
      maxWidth: 360,
      bgcolor: 'rgba(6,6,6,.16)',

    }}
          classes={{
            root: 'chats-list'
          }}
          ref={listRef}
    >
      {chatsList.map((chat: Chat, index: number) => {
        return (<ListItem sx={{
            margin: `${messageIsLocal(chat.author)?"10px auto 10px 5px":"10px 5px 10px auto"}`,
            bgcolor: `${messageIsLocal(chat.author)? 'grey': 'orange'}`,
            width: "80%",
            borderRadius: 2,

          }} key={index} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
            </ListItemAvatar>
            <ListItemText
              primary={chat.author}
              secondary={<React.Fragment>
                {chat.text}
              </React.Fragment>}
            />
          </ListItem>

        )
      })}
    </List>
    <ChatsMessage/>
  </div>)
}

export default Chat
