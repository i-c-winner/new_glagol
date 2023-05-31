import { TextareaAutosize } from "@mui/material";
import styled from "@emotion/styled";
import SvgIcon from "@mui/material/SvgIcon";
import { IconSend } from "../icons";
import Button from "@mui/material/Button";


  function ChatsMessage () {
const TextArea= styled(TextareaAutosize)(()=>{
return `
width: 100%;
margin: 0 auto;
padding: 10px 5px;
border-radius: 5px
`

})
return <div className="chat-message">
  <TextArea />
  <Button sx={{
    color: "white",
    "&:hover": {
      color: "#00ff85",
      cursor: "pointer"
    }
  }}
          className="send__icon">
    <SvgIcon children={IconSend}/>
  </Button>
</div>


}


export default ChatsMessage;
