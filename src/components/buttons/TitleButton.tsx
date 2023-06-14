import { useState } from "react";;
import SvgIcon from "@mui/material/SvgIcon";
import { IconTitle } from "../icons";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";


function TitleButton() {
  const [toggled, setToggled] = useState(false)
  const localStream = useSelector((state: any) => state.roomSlice.localStream)
  function getParams() {
    const baseParams = {
      padding: "0",
      width: "40px",
      height: "40px",
      borderRadius: "3px",
      color: 'white'
    }
    if (!toggled) {
      return {
        ...baseParams
      }
    } else {
      return {
        ...baseParams,
        backgroundColor: "rgba(255, 255, 255, .16)"
      }
    }
  }

  function click() {
    setToggled(!toggled)
  }

  return <Button onClick={click} sx={{ padding: "0" }}>
    <SvgIcon
      viewBox="0 0 35 35"
      sx={getParams()}
      children={IconTitle} />
  </Button>
}


export default TitleButton
