import { useEffect } from "react";
import Glagol from "./App/Glagol";
import { useSelector, useDispatch } from "react-redux";
import { changeRoomName, changeHasRoomName, changeXMPPConnected, changeICreaterRoom } from "./App/configSlice";
import { changeRoomSource, wasUpdateRemoteStreams, updateLocalStream } from "./components/bigScreen/roomSlice";
import { addChatStrophe } from "./components/chat/ChatSlice";
import CreatedDisplayName from "./components/room/CreatedDisplayName";
import Room from "./components/room/Room";
import getRandomText from "./plugins/getRandomText";
import { useNavigate } from "react-router-dom";
import { StateConfigSlice } from "./App/configSlice";

Glagol.xmpp.init()
Glagol.peerAddListener('doSignagling', Glagol.xmpp.doSignaling)


function StartPage() {
  const dispatch = useDispatch()

  const hasRoomName = useSelector((state: StateConfigSlice) => state.configSlice.hasRoomName)
  const hasDisplayName = useSelector((state: StateConfigSlice) => state.configSlice.hasDisplayName)
  const navigate = useNavigate()
  useEffect(() => {
    Glagol.xmppAddListener('connected', XMPPConnected)
    function XMPPConnected() {
      dispatch(changeXMPPConnected(true))
      Glagol.xmpp.peerInit()
    }

    Glagol.peerAddListener('setLocalStream', setLocalStream)
    function setLocalStream() {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
        dispatch(updateLocalStream(stream))
      })
      dispatch(changeRoomSource())
    }

    Glagol.xmppAddListener('updatedRemoteStreams', updatedRemoteStreams)
    Glagol.peerAddListener('updatedRemoteStreams', updatedRemoteStreams)
    Glagol.xmppAddListener('receivingMessage', receivingMessage)

    function receivingMessage
      (...args: [...[string]]) {
      dispatch(addChatStrophe(args[0]))

    }

    function updatedRemoteStreams(...args: [...[unknown]]) {
      dispatch(wasUpdateRemoteStreams(args[0]))
    }

    const url = window.location.pathname.split('/')[1]
    if (url !== "") {
      dispatch(changeHasRoomName(true))
      dispatch(changeRoomName(url))
    } else {
      const url = getRandomText(8)
      dispatch(changeRoomName(url))
      dispatch(changeHasRoomName(true))
      dispatch(changeICreaterRoom(true))
      navigate(`/${url}`)
    }
  }, [])

  function startingRoomName() {
    return hasRoomName && !hasDisplayName
  }

  function startingRoom() {
    return hasRoomName && hasDisplayName
  }

  return (
    <div className="start-page">
      <CreatedDisplayName status={startingRoomName()} />
      <Room status={startingRoom()} />
    </div>
  )
}

export default StartPage;
