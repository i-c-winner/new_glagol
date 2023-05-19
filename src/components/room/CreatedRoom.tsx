import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {changeHasRoomName, changeICreaterRoom, changeRoomName} from "../../App/sliceConfig";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";


function CreatedRoom(props: any) {
  const dispatch = useDispatch()
  const createRoomNameRef = useRef<any>()
  const navigate: any=useNavigate()
  function creatingRoom() {
    console.log(createRoomNameRef.current.value)
    dispatch(changeRoomName(createRoomNameRef.current.value))
    dispatch(changeHasRoomName(true))
    dispatch(changeICreaterRoom(true))
    navigate(`/${createRoomNameRef.current.value}`)
  }
  {
    return !props.status ? <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': {m: 1, width: '25ch'},
        }}
        noValidate
        autoComplete="off"
      >
        <TextField inputRef={createRoomNameRef} id="outlined-basic" label="Outlined" variant="outlined"/>
      </Box>
      <Stack spacing={2} direction="row">
        <Button onClick={creatingRoom}  variant="outlined">Creating Room</Button>
      </Stack>

    </div> : null
  }


}

export default CreatedRoom;
