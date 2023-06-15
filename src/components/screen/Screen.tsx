import Glagol from "../../App/Glagol";

function Screen() {
  function buttons() {
    Glagol.xmpp.getRooms()
  }

  return (<div>
    <p>Screen</p>
    <button onClick={buttons}>Room</button>
  </div>

  )
}

export default Screen;
