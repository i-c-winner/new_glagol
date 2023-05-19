import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeHasDisplayName} from "../../App/sliceConfig";
import Glagol from "../../App/Glagol";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";

function CreatedDisplayName(props: any) {
  const dispatch = useDispatch()
  const {iCreaterRoom, roomName} = useSelector((state: any) => state.sliceConfig)
  // const createUserNameRef=useRef()
  function creatingUser() {
    dispatch(changeHasDisplayName(true))
    if (iCreaterRoom) {
      Glagol.xmpp.createRoom(roomName, true)
    } else {
      Glagol.xmpp.entranceToRoom(roomName)
    }
  }

  {
    return (props.status ? <div>
        <Box
          component="form"
          sx={{
            '& > :not(style)': {m: 1, width: '25ch'},
          }}
          noValidate
          autoComplete="off"
        >
          <TextField  id="outlined-basic" label="Outlined" variant="outlined"/>
        </Box>
        <Stack spacing={2} direction="row">
          <Button onClick={creatingUser}  variant="outlined">Creating Room</Button>
        </Stack>
      </div> : null
    )
  }
}

export default CreatedDisplayName;
