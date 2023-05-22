import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
// import '../../css/components/bigScreen.scss'

function BigScreen() {
  const bigScreenRef = useRef<any>(null)
  const {roomSource} = useSelector((state: any) => state.sliceRoom)
  useEffect(() => {
    if (roomSource !== undefined) {
      roomSource.getTracks().forEach((track: MediaStreamTrack) => {
        if (track.kind === 'video') {
console.log(bigScreenRef.current)
          bigScreenRef.current.srcObject = roomSource
        }
      })
      // bigScreenRef.current.value.srcObjct(roomSource)
    }
  }, [roomSource])

  return (
    <div>
      <p>pp</p>
      <div  className="bigscreen">
        <video autoPlay={true} ref={bigScreenRef} className=" proba bigscreen__video"></video>
      </div>
    </div>

  )
}

export default BigScreen;
