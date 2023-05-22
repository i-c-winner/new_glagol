import BigScreen from "../bigScreen/bigScreen";
import {useSelector} from "react-redux";

function Room(props:any) {
  const {localStream}=useSelector((state: any)=>state.sliceRoom)
  console.log(localStream)
  {return props.status? <div>
    <BigScreen localStream={localStream}/>

  </div>: null}
}

export default Room;
