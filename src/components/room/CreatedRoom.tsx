import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeHasRoomName, changeICreaterRoom, changeRoomName } from "../../App/configSlice";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import getRandomText from "../../plugins/getRandomText";


function CreatedRoom(props: any) {
  const [ buttonIsDisabled, setButtonIsDisabled ] = useState<boolean>(true)
  const dispatch = useDispatch()
  const createRoomNameRef = useRef<any>()
  const navigate: any = useNavigate()

  function creatingRoom() {
    dispatch(changeRoomName(createRoomNameRef.current.value))
    dispatch(changeHasRoomName(true))
    dispatch(changeICreaterRoom(true))
    navigate(`/${createRoomNameRef.current.value}`)
  }
  function changingRoomName() {
    setButtonIsDisabled(false)
  }
useEffect(()=>{
  // const roomName=getRandomText(8)
  // dispatch(changeRoomName(roomName))
  // dispatch(changeHasRoomName(true))
  // dispatch(changeICreaterRoom(true))
  // navigate(`/${roomName}`)
})
  {
    return !props.status ? <div className="input-form">
      <Box
        component="form"
        sx={{
          '& > :not(style)': {
            m: 1,
            width: '25ch'
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField inputRef={createRoomNameRef} onChange={changingRoomName} id="outlined-basic"
                   label="Outlined" variant="outlined"/>
        <Stack spacing={2} direction="row">
          <Button onClick={creatingRoom} disabled={buttonIsDisabled} variant="outlined">Creating Room</Button>
        </Stack>
      </Box>
    </div> : null
  }


}

export default CreatedRoom;
