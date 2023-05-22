import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeDisplayName, changeHasDisplayName} from "../../App/sliceConfig";
import Glagol from "../../App/Glagol";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";

function CreatedDisplayName(props: any) {
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const displayNameRef=useRef<any>()
  const {iCreaterRoom, roomName} = useSelector((state: any) => state.sliceConfig)
  // const createUserNameRef=useRef()
  function creatingUser() {
    dispatch(changeHasDisplayName(true))
    dispatch(changeDisplayName(displayNameRef.current.value))
    if (iCreaterRoom) {
      Glagol.xmpp.createRoom(roomName)
    } else {
      Glagol.xmpp.entranceToRoom(roomName)
    }
    navigate(`/${roomName}`)
  }

  {
    return (props.status ? <div>
        Введите своё имя
        <Box
          component="form"
          sx={{
            '& > :not(style)': {m: 1, width: '25ch'},
          }}
          noValidate
          autoComplete="off"
        >
          <TextField inputRef={displayNameRef} id="outlined-basic" label="Outlined" variant="outlined"/>
        </Box>
        <Stack spacing={2} direction="row">
          <Button onClick={creatingUser}  variant="outlined">Creating displayName</Button>
        </Stack>
      </div> : null
    )
  }
}

export default CreatedDisplayName;
