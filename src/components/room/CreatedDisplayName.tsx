import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDisplayName, changeHasDisplayName } from "../../App/configSlice";
import Glagol from "../../App/Glagol";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function CreatedDisplayName(props: any) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const displayNameRef = useRef<any>()
  const {
          iCreaterRoom,
          roomName
        } = useSelector((state: any) => state.configSlice)
  const {roomSource} = useSelector((state: any)=>state.roomSlice)
  const refVideo = useRef<any>()

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

  useEffect(() => {
   if (roomSource) refVideo.current.srcObject = Glagol.getLocalStream()
  }, [roomSource])
  {
    return (props.status ? <div className="creat-name">
      <Stack direction="row" spacing={8}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': {
              m: 1,
              width: '250px',
            },
            bgcolor: '#b8c2f0',
            boxShadow: 2,
            p: 5,
            display: 'flex',
            flexFlow: 'column'

          }}
          noValidate
          autoComplete="off"
        >
          <TextField inputRef={displayNameRef} id="outlined-basic" label="Outlined" variant="outlined"/>
          <Button classes={{
            text: 'creat-name__button'
          }} onClick={creatingUser} variant="text">Присоедениться ко встрече</Button>
        </Box>
        <video className="video" autoPlay={true} ref={refVideo}></video>
      </Stack>


    </div> : null)
  }
}

export default CreatedDisplayName;
