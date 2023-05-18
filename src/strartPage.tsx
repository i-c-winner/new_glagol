import React, { useState} from "react";
import Glagol from "./App/Glagol";
import {useSelector} from "react-redux";
import CreatedRoom from "./components/room/CreatedRoom";
import CreatedDisplayName from "./components/room/CreatedDisplayName";
import Room from "./components/room/Room";

Glagol.xmpp.init()
function StartPage() {
  const [createdRoomName, setCreatedRoomName] =useState(useSelector((state: any)=>state.sliceConfig.roomName))
  const [createdDisplayName, setDisplayName] =useState(useSelector((state: any)=>state.sliceConfig.displayName))
  const [room, setRoom]= useState(useSelector((state: any)=>state.sliceConfig.room))
  console.log(room)
  return (
    <div>
      {!createdRoomName? <CreatedRoom />:null}
      {!createdDisplayName&&createdRoomName?<CreatedDisplayName/>: null}
      {room? <Room />: null}
    </div>
  )
}

export default StartPage;
