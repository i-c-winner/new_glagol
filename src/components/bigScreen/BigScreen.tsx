import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import RemoteStreams from "../remoteStreams/RemoteStreams";
import Chat from "../chat/Chat";
import { StateRoomSlice } from "./roomSlice";
import { StateChatSlice } from "../chat/ChatSlice";

function BigScreen() {
  const bigScreenRef = useRef<null | HTMLVideoElement>(null)
  const { localStream } = useSelector((state: StateRoomSlice) => state.roomSlice)
  const { visibleChats } = useSelector((state: StateChatSlice) => state.chatSlice)
  useEffect(() => {
    if (localStream !== null) {
      if (bigScreenRef.current !== null) {
        bigScreenRef.current.srcObject = localStream[0]
      }
    }

  }, [localStream])
  return (<div>
    <div className="bigscreen">
      {visibleChats ? <Chat /> : null}
      <video autoPlay={true} ref={bigScreenRef} className="bigscreen__video"></video>
      <RemoteStreams />
    </div>
  </div>
  )
}

export default BigScreen;
