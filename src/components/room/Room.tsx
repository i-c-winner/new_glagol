import React, {useState, createRef, useEffect} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Glagol from "../../App/Glagol";
import Screen from "../Screen/Screen";
import {useSelector} from "react-redux";

if (!Glagol.xmpp.getInitialStatus()) {
  console.log()
  Glagol.xmpp.init()
  Glagol.xmpp.initialization()
}



function Room() {
  const createdRoom=useSelector((state: any)=>state.createdRoom)
  const [roomName, setRoomName]= useState('')
  const [isCreatingUserName, setIsCreatingUserName] = useState<boolean>(true)
  if (createdRoom) {
    Glagol.xmpp.peerInit()
    setIsCreatingUserName(false)
  }
  useEffect(()=>{
    setRoomName(window.location.pathname.split('/')[1])
  }, [])
  const [userName, setUserName] = useState<string>("")
  const inputRef = createRef<any>()

  function createUserName() {
   if (!createdRoom) Glagol.xmpp.createRoom(roomName)
  }

  function changeUserName() {
    setUserName(inputRef.current.value)
  }

  return <div>
    <p>RoomName: {roomName}</p>
    <hr />
    <p>ScreenName: {userName}</p>
    <hr />
   {
    isCreatingUserName ? <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': {m: 1, width: '25ch'},
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" onChange={changeUserName} label="Outlined" inputRef={inputRef}
                   variant="outlined"/>
      </Box>
      <Stack spacing={2} direction="row">
        <Button onClick={createUserName} variant="outlined">Input Name</Button>
      </Stack>
    </div> : <Screen/>}
  </div>
      }

    export default Room;
