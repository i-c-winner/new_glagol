import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { wasUpdateRemoteStreams } from "../bigScreen/roomSlice";
import SmallScreen from "../smallScreen/SmallScreen";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Glagol from "../../App/Glagol";

function RemoteStreams() {
  console.log('renmoteStrreams')
  const [ remoteStreams, setRemoteStreams ] = useState([])
  const dispatch = useDispatch()
  const { remoteStreamsWereUpdated } = useSelector((state: any) => state.roomSlice)

  useEffect(() => {
    if (remoteStreamsWereUpdated) {
      console.log(Glagol.getRemoteStreams().slice(2))
      setRemoteStreams(Glagol.getRemoteStreams().slice(2))
      dispatch(wasUpdateRemoteStreams(false))
    }
  }, [ remoteStreamsWereUpdated ])
  return (<List sx={{
      width: '100%',
      maxWidth: 360,
      bgcolor: 'background.paper'
    }}
                classes= {{
      root: "remote-streams"
    }}
    >
      {remoteStreams.map((stream: any, index) => {
        return <ListItem alignItems="flex-start" key={index}>
          <SmallScreen stream={stream}/>
        </ListItem>
      })}
    </List>)
}

export default RemoteStreams
