import {useSelector} from "react-redux";
import BigScreen from "../bigScreen/BigScreen";
import Tollbar from "../tollbar/Tollbar";
import Chat from "../../store/Chat";

function Room(props: any) {
  const {visibleChats}=useSelector((state: any)=>state.chatSlice)
  {
    return props.status ? <div>
      <BigScreen/>
      <Tollbar/>
      {visibleChats?<Chat />:null}

    </div> : null
  }
}

export default Room;
