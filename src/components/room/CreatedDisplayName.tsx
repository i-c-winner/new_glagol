import React from "react";
import {useDispatch} from "react-redux";
import {changeDisplayName} from "../../App/sliceConfig";

function CreatedDisplayName(props: any) {
  const dispatch=useDispatch()
  function click () {
    dispatch(changeDisplayName(true))
  }
  {
    return (props.status ? <div>

        <p>CreatedDisplayName</p>
    <button onClick={click}>created DIsk</button>
    </div>: null
    )
  }
}

export default CreatedDisplayName;
