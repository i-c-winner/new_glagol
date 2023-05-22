import BigScreen from "../bigScreen/BigScreen";

function Room(props:any) {

  {return props.status? <div>
    <BigScreen />

  </div>: null}
}

export default Room;
