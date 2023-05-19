import React, {useEffect} from "react";
import Glagol from "./App/Glagol";
import {useSelector, useDispatch} from "react-redux";
import {changeRoomName, changeXMPPConnected} from "./App/sliceConfig";
import CreatedRoom from "./components/room/CreatedRoom";
import CreatedDisplayName from "./components/room/CreatedDisplayName";
import Room from "./components/room/Room";

Glagol.xmpp.init()

function StartPage() {
  const dispatch=useDispatch()
  Glagol.xmpp.xmppOnListener('connected', XMPPConnected)
  function XMPPConnected () {
    dispatch(changeXMPPConnected(true))
  }

  const roomName = useSelector((state: any) => state.sliceConfig.roomName)
  const displayName = useSelector((state: any) => state.sliceConfig.displayName)
 useEffect(()=>{
   const url=window.location.pathname.split('/')[1]
   if (url!=="") {
     dispatch(changeRoomName(url))
   }
 }, [])
  function startingRoom() {
    return roomName && displayName
  }
function createdRoomName() {
    return roomName&&!displayName
}
  return (

    <div>
      <p>{String(roomName)}</p>
      <CreatedRoom status={roomName}/>
      <CreatedDisplayName status={createdRoomName()}/>
      <Room status={startingRoom()}/>
    </div>
  )
}

export default StartPage;
