import { TextareaAutosize } from "@mui/material";
import styled from "@emotion/styled";
import SvgIcon from "@mui/material/SvgIcon";
import { IconSend } from "../icons";


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
  <div className="send__icon">
    <SvgIcon children={IconSend}/>
  </div>
</div>


}


export default ChatsMessage;
