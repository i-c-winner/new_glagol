import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Glagol from "../../App/Glagol";

function Room(props:any) {
  function getRooms() {
    Glagol.xmpp.getRoom()
  }
  {return props.status? <div>
    <p>Room</p>
    <Stack spacing={2} direction="row">
      <Button onClick={getRooms}  variant="outlined">Get rooms</Button>
    </Stack>

  </div>: null}
}

export default Room;
