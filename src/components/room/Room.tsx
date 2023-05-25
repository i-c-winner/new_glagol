import BigScreen from "../bigScreen/BigScreen";
import Tollbar from "../tollbar/Tollbar";

function Room(props: any) {
  {
    return props.status ? <div>
      <BigScreen/>
      <Tollbar/>
    </div> : null
  }
}

export default Room;
