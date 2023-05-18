import { onListeners } from "../plugins/createListeners";
var PeerConnection = /** @class */ (function () {
    function PeerConnection() {
        var _this = this;
        this._listener = {};
        this.pc = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302'
                }
            ]
        });
        this.pc.onicecandidate = (function (event) {
            if (event.candidate === null) {
                _this.localDescription = window.btoa(JSON.stringify(_this.pc.localDescription));
            }
        });
        // this.streams = new Promise((resolve: any, reject: any) => {
        //   resolve(navigator.mediaDevices.getUserMedia({video: true, audio: true}))
        // })
    }
    PeerConnection.prototype.init = function () {
        var _this = this;
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) {
            _this.stream = stream;
        });
    };
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
    PeerConnection.prototype.on = function (event, callback) {
        onListeners.call(this, event, callback);
    };
    return PeerConnection;
}());
export default PeerConnection;
