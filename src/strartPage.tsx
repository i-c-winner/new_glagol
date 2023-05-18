import React, {useEffect} from "react";
import Glagol from "./App/Glagol";
import {useSelector, useDispatch} from "react-redux";
import {changeRoomName} from "./App/sliceConfig";
import CreatedRoom from "./components/room/CreatedRoom";
import CreatedDisplayName from "./components/room/CreatedDisplayName";
import Room from "./components/room/Room";

Glagol.xmpp.init()

function StartPage() {
  const dispatch=useDispatch()
  const roomName = useSelector((state: any) => state.sliceConfig.roomName)
  const displayName = useSelector((state: any) => state.sliceConfig.displayName)
 useEffect(()=>{
   const url=window.location.pathname.split('/')[1]
   if (url!=="") {
     dispatch(changeRoomName(true))
   }
 }, [])
  function startingRoom() {
    return roomName && displayName
  }
function createdRoomName() {
    console.log(roomName&&displayName, 'dsdsfdsaf')
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
