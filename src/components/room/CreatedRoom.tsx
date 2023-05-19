import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeRoomName, changeICreaterRoom} from "../../App/sliceConfig";


function CreatedRoom(props: any) {
  const {XMPPConnected}=useSelector((state: any)=>state.sliceConfig)
  const dispatch=useDispatch()

  function click() {
    dispatch(changeRoomName(true))
    dispatch(changeICreaterRoom(true))
  }

    {return !props.status?   <div>
        <p>Created Room</p>
      <p>{String(XMPPConnected)}</p>
      <button onClick={click}></button>

      </div> : null }



}

export default CreatedRoom;
