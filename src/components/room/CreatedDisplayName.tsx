import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeDisplayName} from "../../App/sliceConfig";
import Glagol from "../../App/Glagol";

function CreatedDisplayName(props: any) {
  const dispatch = useDispatch()
  const {iCreaterRoom, roomName} = useSelector((state: any) => state.sliceConfig)

  function click() {
    dispatch(changeDisplayName(true))
    if (iCreaterRoom) {
      Glagol.xmpp.createRoom(roomName)
    } else {

      Glagol.xmpp.entranceToRoom(roomName)
    }
  }

  {
    return (props.status ? <div>
        <p>CreatedDisplayName</p>
        <button onClick={click}>created DIsk</button>
      </div> : null
    )
  }
}

export default CreatedDisplayName;
