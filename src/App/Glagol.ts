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
  },
  changeVisibleVideo() {
    return this.xmpp.changeVisibleVideo()
  },
  stopVideo() {
    return this.xmpp.stopVideo()
  }
}

export default Glagol
