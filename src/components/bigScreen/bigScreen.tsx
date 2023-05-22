function BigScreen(props: any) {
  console.log(props.localStream)
  return (
    <div className="bigScreen">{props.localStream}</div>
  )
}
export default BigScreen;
