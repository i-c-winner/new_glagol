import {onListeners, emitListeners} from "../plugins/createListeners";

class PeerConnection {
  pc: RTCPeerConnection;
  // @ts-ignore
  private _listener: { [key: string]: [...Function[]] };
  // @ts-ignore
  private localDescription: any;
  private localStream: undefined|MediaStream;
  public remoteStreams: any;

  constructor() {
    this.localStream=undefined
    this._listener = {}
    this.pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    })
    this.pc.onicecandidate = (event => {
      if (event.candidate === null) {
        this.localDescription = window.btoa(JSON.stringify(this.pc.localDescription))
        this.emit('doSignaling', window.btoa(JSON.stringify(this.pc.localDescription)))
      }
    })
  }

  init() {
    navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream: MediaStream) => {
      this.localStream = stream
      this.emit('setLocalStream')
      stream.getTracks().forEach((track) => {
        this.pc.addTrack(track)
      })
      this.pc.createOffer().then((offer) => {
        this.pc.setLocalDescription(offer)
      })
      return stream
    })
  }

 getLocalStream() {
    return this.localStream
 }

 setRemoteStreams() {
    this.remoteStreams=this.getRemoteStreams()
 }

 getRemoteStreams() {
    return this.remoteStreams
 }
  on(event: string, callback: Function) {
    onListeners.call(this, event, callback)
  }

  emit(event: string, ...args: any[]) {
    emitListeners.call(this, event, args)
  }
}


export default PeerConnection
