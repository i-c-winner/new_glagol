import {useEffect} from "react";
import Glagol from "./App/Glagol";
import {useSelector, useDispatch} from "react-redux";
import {changeRoomName, changeHasRoomName, changeXMPPConnected} from "./App/configSlice";
import {changeRoomSource, wasUpdateRemoteStreams} from "./components/bigScreen/roomSlice";
import CreatedRoom from "./components/room/CreatedRoom";
import CreatedDisplayName from "./components/room/CreatedDisplayName";
import Room from "./components/room/Room";
import Chat from "./components/chat/Chat";

Glagol.xmpp.init()
Glagol.peerAddListener('doSignagling', Glagol.xmpp.doSignaling)


function StartPage() {
  const dispatch = useDispatch()
  const hasRoomName = useSelector((state: any) => state.configSlice.hasRoomName)
  const hasDisplayName = useSelector((state: any) => state.configSlice.hasDisplayName)
  const {visibleChats}=useSelector((state: any)=>state.chatSlice)
  console.log(visibleChats)
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

    function updatedRemoteStreams(...args: [...[any]]) {
      dispatch(wasUpdateRemoteStreams(args[0]))
    }

    const url = window.location.pathname.split('/')[1]
    if (url !== "") {
      dispatch(changeHasRoomName(true))
      dispatch(changeRoomName(url))
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
      <CreatedRoom status={hasRoomName}/>
      <CreatedDisplayName status={startingRoomName()}/>
      {visibleChats?<Chat />:null}
      <Room status={startingRoom()}/>
    </div>
  )
}

export default StartPage;
