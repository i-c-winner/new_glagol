import BigScreen from "../bigScreen/BigScreen";
import Tollbar from "../tollbar/Tollbar";

function Room(props: any) {
  {
    return props.status ? <div className="room">
      <BigScreen/>
      <Tollbar/>
    </div> : null
  }
}

export default Room;
