import React, {useEffect, useState} from "react";
import Glagol from "./App/Glagol";
import {useSelector, useDispatch} from "react-redux";
import {changeRoomName, changeHasRoomName, changeXMPPConnected} from "./App/sliceConfig";
import CreatedRoom from "./components/room/CreatedRoom";
import CreatedDisplayName from "./components/room/CreatedDisplayName";
import Room from "./components/room/Room";

Glagol.xmpp.init()

function StartPage() {
  const dispatch = useDispatch()
  Glagol.xmpp.xmppOnListener('connected', XMPPConnected)

  function XMPPConnected() {
    dispatch(changeXMPPConnected(true))
  }

  const hasRoomName = useSelector((state: any) => state.sliceConfig.hasRoomName)
  const hasDisplayName = useSelector((state: any) => state.sliceConfig.hasDisplayName)
  useEffect(() => {
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

    <div>
      <CreatedRoom status={hasRoomName}/>
      <CreatedDisplayName status={startingRoomName()}/>
      <Room status={startingRoom()}/>
    </div>
  )
}

export default StartPage;
