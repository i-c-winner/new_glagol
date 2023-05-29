import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Glagol from "../../App/Glagol";
import RemoteStreams from "../remoteStreams/RemoteStreams";
import Chat from "../chat/Chat";
// import '../../css/components/bigScreen.scss'

function BigScreen() {
  const bigScreenRef = useRef<any>(null)
  const { roomSource } = useSelector((state: any) => state.roomSlice)
  const {visibleChats}=useSelector((state: any)=>state.chatSlice)
  useEffect(() => {
    const localStream: any = Glagol.getLocalStream()
    if (roomSource) {
      localStream.getTracks().forEach((track: MediaStreamTrack) => {
        if (track.kind === 'video') {
          bigScreenRef.current.srcObject = localStream
        }
      })
    }
  }, [ roomSource ])

  return (<div>
      <div className="bigscreen">
        {visibleChats?<Chat />:null}
        <video autoPlay={true} ref={bigScreenRef} className=" proba bigscreen__video"></video>
        <RemoteStreams />
      </div>
    </div>

  )
}

export default BigScreen;
