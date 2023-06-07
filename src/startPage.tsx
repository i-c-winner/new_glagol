import { useEffect } from "react";
import Glagol from "./App/Glagol";
import { useSelector, useDispatch } from "react-redux";
import { changeRoomName, changeHasRoomName, changeXMPPConnected, changeICreaterRoom } from "./App/configSlice";
import { changeRoomSource, wasUpdateRemoteStreams } from "./components/bigScreen/roomSlice";
import CreatedDisplayName from "./components/room/CreatedDisplayName";
import Room from "./components/room/Room";
import getRandomText from "./plugins/getRandomText";
import { useNavigate } from "react-router-dom";


function StartPage() {
  const dispatch = useDispatch()
  const hasRoomName = useSelector((state: any) => state.configSlice.hasRoomName)
  const hasDisplayName = useSelector((state: any) => state.configSlice.hasDisplayName)
  const navigate = useNavigate()
  useEffect(() => {
    Glagol.xmpp.init()

    function addListeners() {
      Glagol.peerAddListener('doSignagling', Glagol.xmpp.doSignaling)
      Glagol.xmppAddListener('connected', listeners.XMPPConnected)
      Glagol.peerAddListener('setLocalStream', listeners.setLocalStream)
      Glagol.xmppAddListener('updatedRemoteStreams', listeners.updatedRemoteStreams)
      Glagol.peerAddListener('updatedRemoteStreams', listeners.updatedRemoteStreams)
    }
    const listeners = {
      XMPPConnected() {
        dispatch(changeXMPPConnected(true))
        Glagol.xmpp.peerInit()
      },
      setLocalStream() {
        dispatch(changeRoomSource())
      },
      updatedRemoteStreams(...args: [ ...[ any ] ]) {
        dispatch(wasUpdateRemoteStreams(args[0]))
      }
    }

    addListeners()

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
      <CreatedDisplayName status={startingRoomName()}/>
      <Room status={startingRoom()}/>
    </div>)
}

export default StartPage;
