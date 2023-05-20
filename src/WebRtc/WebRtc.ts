import {onListeners, emitListeners} from "../plugins/createListeners";

class PeerConnection {
  pc: RTCPeerConnection;
  private _listener: { [key: string]: [...Function[]] };
  private localDescription: any;

  constructor() {
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
        console.log(this._listener)
        this.emit('doSignaling', window.btoa(JSON.stringify(this.pc.localDescription)))
      }
    })
  }

  init() {
    navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream: MediaStream) => {
      stream.getTracks().forEach((track) => {
        this.pc.addTrack(track)
      })
      this.pc.createOffer().then((offer) => {
        this.pc.setLocalDescription(offer)
      })
      return stream
    })
  }

  // getPeerConnection() {
  //   return this.pc
  // }
  //
  // addTracks(streams: any) {
  //   streams[0].getTracks().forEach((stream: MediaStreamTrack) => {
  //     this.pc.addTrack(stream)
  //   })
  //   this._createOffer()
  // }
  //
  // _createOffer() {
  //   const pc = this.getPeerConnection()
  //   pc.createOffer().then((offer: any) => {
  //     pc.setLocalDescription(offer)
  //   })
  // }
  //
  // setRemoteDescription(description: any) {
  //   const pc = this.getPeerConnection()
  //   try {
  //     pc.setRemoteDescription(description)
  //   } catch (e) {
  //     console.log('error', e)
  //   }
  // }
  //
  on(event: string, callback: Function) {
    onListeners.call(this, event, callback)
  }

  emit(event: string, ...args: any[]) {
    emitListeners.call(this, event, args)
  }
}


export default PeerConnection
