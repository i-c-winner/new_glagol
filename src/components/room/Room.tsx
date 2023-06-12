import BigScreen from "../bigScreen/BigScreen";
import Toolbar from "../toolbar/Toolbar";
type Props = {
  status: boolean
}

function Room(props: Props) {
  {
    return props.status ? <div className="room">
      <BigScreen />
      <Toolbar />
    </div> : null
  }
}
export default Room;
