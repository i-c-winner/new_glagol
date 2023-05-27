import {XMPP} from "../XMPP/xmpp";
const xmpp= new XMPP()
const Glagol = {
  xmpp,
  xmppAddListener: function (event :string, callback: Function): void {
    this.xmpp.xmppOnListener(event, callback)
  },
  peerAddListener : function(event : string, callback : Function) : void {
      this.xmpp.peerOnListener(event, callback)
  },
  getLocalStream () {
    return this.xmpp.getLocalStream()
  },
  getRemoteStreams() {
  return  this.xmpp.getRemoteStreams()
  }
}

export default Glagol
