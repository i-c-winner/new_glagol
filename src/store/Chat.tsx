import React from 'react';
import { useSelector } from "react-redux";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

type Chat = {
  author: string, text: string
}

function Chat() {
  const { chatsList } = useSelector((state: any) => state.chatSlice)
  console.log(chatsList)
  return (<List sx={{
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  }}
                classes={{ root: 'chats-list' }}
  >
    {chatsList.map((chat: Chat) => {
      return (<ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
          </ListItemAvatar>
          <ListItemText
            primary={chat.author}
            secondary={<React.Fragment>
              {chat.text}
            </React.Fragment>}
          />
          <Divider variant="inset" component="li"/>
        </ListItem>

      )
    })}
  </List>)
}

export default Chat
