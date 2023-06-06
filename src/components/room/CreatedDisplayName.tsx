import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDisplayName, changeHasDisplayName } from "../../App/configSlice";
import Glagol from "../../App/Glagol";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import CameraButton from "../buttons/CameraButton";
import MicrophoneButton from "../buttons/MicrophoneButton";

function CreatedDisplayName(props: any) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [ currentDisplayName, setCurrenDisplayName ] = useState<any>('')
  const displayNameRef = useRef<any>('')
  const {
          iCreaterRoom,
          roomName
        } = useSelector((state: any) => state.configSlice)
  const { roomSource } = useSelector((state: any) => state.roomSlice)
  const refVideo = useRef<any>()

  useEffect(() => {
    if (roomSource) refVideo.current.srcObject = Glagol.getLocalStream()
  }, [ roomSource ])

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

  function changeCurrentDisplayName() {
    setCurrenDisplayName(displayNameRef.current.value)
  }

  function chackButton() {
    if (!roomSource) {
      return true
    } else {
      if (currentDisplayName !== '') {
        return false
      }
      return true
    }
  }

  {
    return (props.status ? <div className="create-name">
      <Stack direction="row" spacing={8}>
        <Box
          component="div"
          sx={{
            bgcolor: '#b8c2f0',
            boxShadow: 2,
            width: "400px",
            height: "300px",
          }}
        >
          <Box
            onSubmit={creatingUser}
            component="form"
            sx={{
              '& > :not(style)': {
                m: 1,
                width: '250px',
              },
              bgcolor: '#b8c2f0',
              p: 5,
              display: 'flex',
              flexFlow: 'column',
            }}
            noValidate
            autoComplete="off"
          >
            <TextField inputRef={displayNameRef}  classes={{root: "create-name__input"}} sx={{ width: "100%" }} onChange={changeCurrentDisplayName}
                       placeholder="Введите имя"
                       id="outlined-basic" label="Имя" variant="outlined"/>
            <Button
              classes={{
                text: 'create-name__button',
                disabled: "create-name__button_disabled",
              }} onClick={creatingUser} variant="text" disabled={chackButton()}>Присоедениться ко встрече</Button>
          </Box>
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <CameraButton/>
            <MicrophoneButton/>
          </Box>
        </Box>

        <video className="video" autoPlay={true} ref={refVideo}></video>
      </Stack>


    </div> : null)
  }
}

export default CreatedDisplayName;
