import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {wasUpdateRemoteStreams} from "../bigScreen/roomSlice";
import Glagol from "../../App/Glagol";

function RemoteStreams() {
  const dispatch = useDispatch()
  const { remoteStreamsWereUpdated } = useSelector((state: any) => state.roomSlice)
  useEffect(()=>{
    if (remoteStreamsWereUpdated){
      dispatch(wasUpdateRemoteStreams(false))

      console.log(Glagol.getRemoteStreams())
    }
  }, [remoteStreamsWereUpdated])
  return (
    <div className="remote-streams">remote Streams</div>
  )
}

export default RemoteStreams
