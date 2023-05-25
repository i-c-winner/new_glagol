import {useSelector} from "react-redux";

function Tollbar() {
  const {tollbarButtons}=useSelector((state: any)=>state.interface)
  debugger
  return (
    <div className="tollbar">
      {tollbarButtons.map((button: string)=>{
        return <p>{button}</p>
      })}
    </div>
  )
}

export default Tollbar;
