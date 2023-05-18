import React from "react";
import {useDispatch} from "react-redux";
import {changeRoomName} from "../../App/sliceConfig";


function CreatedRoom(props: any) {
  const dispatch=useDispatch()
  function click() {
    dispatch(changeRoomName(true))
  }

    {return !props.status?   <div>
        <p>Created Room</p>
      <button onClick={click}></button>

      </div> : null }



}

export default CreatedRoom;
