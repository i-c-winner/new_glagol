import {useEffect} from "react";
import Glagol from "./App/Glagol";
import {useSelector, useDispatch} from "react-redux";
import { changeRoomName, changeHasRoomName, changeXMPPConnected, changeICreaterRoom } from "./App/configSlice";
import {changeRoomSource, wasUpdateRemoteStreams} from "./components/bigScreen/roomSlice";
import CreatedDisplayName from "./components/room/CreatedDisplayName";
import Room from "./components/room/Room";
import getRandomText from "./plugins/getRandomText";
import {useNavigate} from "react-router-dom";

Glagol.xmpp.init()
Glagol.peerAddListener('doSignagling', Glagol.xmpp.doSignaling)


function StartPage() {
  const dispatch = useDispatch()
  const hasRoomName = useSelector((state: any) => state.configSlice.hasRoomName)
  const hasDisplayName = useSelector((state: any) => state.configSlice.hasDisplayName)
  const navigate=useNavigate()
  useEffect(() => {
    Glagol.xmppAddListener('connected', XMPPConnected)
    function XMPPConnected() {
      dispatch(changeXMPPConnected(true))
      Glagol.xmpp.peerInit()
    }

    Glagol.peerAddListener('setLocalStream', setLocalStream)
    function setLocalStream() {
      dispatch(changeRoomSource())
    }

    Glagol.xmppAddListener('updatedRemoteStreams', updatedRemoteStreams)
    Glagol.peerAddListener('updatedRemoteStreams', updatedRemoteStreams)

    function updatedRemoteStreams(...args: [...[any]]) {
      dispatch(wasUpdateRemoteStreams(args[0]))
    }

    const url = window.location.pathname.split('/')[1]
    if (url !== "") {
      dispatch(changeHasRoomName(true))
      dispatch(changeRoomName(url))
    } else {
      const url=getRandomText(8)
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
    </div>
  )
}

export default StartPage;
