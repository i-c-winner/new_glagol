import BigScreen from "../bigScreen/BigScreen";
import Toolbar from "../tollbar/Toolbar";

function Room(props: any) {
  {
    return props.status ? <div className="room">
      <BigScreen/>
      <Toolbar/>
    </div> : null
  }
}

export default Room;
