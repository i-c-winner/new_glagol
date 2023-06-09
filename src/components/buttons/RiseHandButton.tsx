import { useState } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { IconRiseHand } from "../icons";
import Button from "@mui/material/Button";


function RiseHandButton() {
  const [toggled, setToggled] = useState(false)

  function getParams() {
    const baseParams = {
      padding: "0",
      width: "40px",
      height: "40px",
      borderRadius: "3px",
      color: "white"
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
      children={IconRiseHand} />
  </Button>
}


export default RiseHandButton
