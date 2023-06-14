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
import { StateConfigSlice } from "../../App/configSlice";
import { StateRoomSlice } from "../bigScreen/roomSlice";
import BigScreen from "../bigScreen/BigScreen";
type Props = {
  status: boolean
}

function CreatedDisplayName(props: Props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentDisplayName, setCurrenDisplayName] = useState('')
  const displayNameRef = useRef<any>()
  const {
    iCreaterRoom,
    roomName
  } = useSelector((state: StateConfigSlice) => state.configSlice)
  const { roomSource } = useSelector((state: StateRoomSlice) => {
    return state.roomSlice
  }
  )
  const refVideo = useRef<any>()

  useEffect(() => {
    if (roomSource) {
      refVideo.current.srcObject = Glagol.getLocalStream()
    }
  }, [roomSource])

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
            p: 4,
            boxSizing: "border-box"
          }}
        >
          <Box
            onSubmit={creatingUser}
            component="form"
            sx={{
              '& > :not(style)': {
                width: '250px',
              },
              bgcolor: '#b8c2f0',
              display: 'flex',
              flexFlow: 'column',
            }}
            noValidate
            autoComplete="off"
          >
            <TextField inputRef={displayNameRef} classes={{ root: "create-name__input" }} sx={{ width: "100%", mt: 3 }}
              onChange={changeCurrentDisplayName}
              placeholder="Введите имя"
              id="outlined-basic" label="Имя" variant="outlined" />
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
              p: 1,
              mt: 4,
              backgroundColor: "rgba(0, 0, 0, .25)",
              borderRadius: "3px",
              justifyContent: "center",
            }}
          >
            <CameraButton />
            <MicrophoneButton />
          </Box>
        </Box>
        <div className="video" ref={refVideo}>
          <BigScreen />
        </div>

      </Stack>
    </div> : null)
  }
}

export default CreatedDisplayName;
