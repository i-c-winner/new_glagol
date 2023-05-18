
import getRandomText from "../plugins/getRandomText";
import {onListeners, emitListeners} from "../plugins/createListeners";
import PeerConnection from "../WebRtc/WebRtc";
const {Strophe}: any = require('strophe.js')
const register: any = require('strophe-plugin-register')
class XMPP {
  public xmpp: any;
  public conn: any;
  private connection: any;
  private peerConnection: PeerConnection;
  private password: string;
  private userName: string;
  private initialized: boolean;


  constructor() {
    this.initialized = false
    this.conn = null
    this.connection = new Strophe.Connection('https://xmpp.prosolen.net:5281/http-bind')
    this.peerConnection = new PeerConnection()
    this.password = getRandomText(7)
    this.userName = getRandomText(5)
    // this.xmpp.then((connection: any) => {
    //   this.conn = connection
    //   connection.addHandler(this.addHandler)
    //   const callbackRegistry = (status: number) => {
    //     if (status === Strophe.Status.REGISTER) {
    //       // fill out the fields
    //       connection.register.fields.username = getRandomText(5);
    //       connection.register.fields.password = getRandomText(7);
    //       // calling submit will continue the registration process
    //       connection.register.submit();
    //     } else if (status === Strophe.Status.REGISTERED) {
    //       console.log("registered!");
    //       // calling login will authenticate the registered JID.
    //       connection.authenticate();
    //     } else if (status === Strophe.Status.CONFLICT) {
    //       console.log("Contact already existed!");
    //     } else if (status === Strophe.Status.NOTACCEPTABLE) {
    //       console.log("Registration form not properly filled out.")
    //     } else if (status === Strophe.Status.REGIFAIL) {
    //       console.log("The Server does not support In-Band Registration")
    //     } else if (status === Strophe.Status.CONNECTED) {
    //       this.emit('xmppConnected')
    //       this.emit('changeXmppState')
    //     }
    //   }
    //   connection.register.connect("@prosolen.net", callbackRegistry.bind(this))
    // })
  }

  init() {
    this.connection.register.connect("@prosolen.net", this.callbackRegistry)
  }

  peerInit() {
    this.peerConnection.init()
  }

  initialization() {
    this.initialized = true
  }

  getInitialStatus() {
    return this.initialized
  }

  callbackRegistry = (status: any) => {
    if (status === Strophe.Status.REGISTER) {
      // fill out the fields
      this.connection.register.fields.username = this.userName;
      this.connection.register.fields.password = this.password;
      // calling submit will continue the registration process
      this.connection.register.submit();
    } else if (status === Strophe.Status.REGISTERED) {
      console.log("registered!");
      // calling login will authenticate the registered JID.
      this.connection.authenticate();
    } else if (status === Strophe.Status.CONFLICT) {
      console.log("Contact already existed!");
    } else if (status === Strophe.Status.NOTACCEPTABLE) {
      console.log("Registration form not properly filled out.")
    } else if (status === Strophe.Status.REGIFAIL) {
      console.log("The Server does not support In-Band Registration")
    } else if (status === Strophe.Status.CONNECTED) {
    this.connection.addHandler(this.addHandler)
    console.log(this.connection)
    }
  }

  addHandler = (stanza: any) => {
    const from = stanza.getAttribute('from');
    const type = stanza.getAttribute('type');
    const elems = stanza.getElementsByTagName('body');
    const message = Strophe.getText(elems[0]);
    console.log(stanza, 'Stanza')
    if (type === 'chat') {
      if (message === 'add_track') {
        console.log('add_track')
      } else {
        const rtcSd = new RTCSessionDescription((JSON.parse(window.atob(message))))
        console.log(rtcSd, 'RTCSD')
        this.emit('setRemoteDescription', rtcSd)
      }
    }
    return true
  }

  createRoom(roomName: string) {
    const message = new Strophe.Builder('presence', {
      from: `${this.connection.jid}`,
      to: `${roomName}@conference.prosolen.net/${this.connection.jid.split('/')[1]}`
    }).c('x', {
      xmlns: 'http://jabber.org/protocol/muc'
    })
    console.log(this.connection)
    this.connection.send(message)
  }

  getRoom() {
    // <iq from='hag66@shakespeare.lit/pda'
    // id='zb8q41f4'
    // to='chat.shakespeare.lit'
    // type='get'>
    // <query xmlns='http://jabber.org/protocol/disco#items'/>
    //   </iq>

    const message = new Strophe.Builder('iq', {
      to: 'conference.prosolen.net',
      id:'zb8q41f4',
      from: `${this.connection.jid}`,
      type: 'get'
    }).c('query', {
      xmlns: 'http://jabber.org/protocol/disco#items'
    })
    this.connection.send(message)
  }

  xmppOnListener(event: string, callback: Function) {
    onListeners.call(this, event, callback)
  }

  peerOnListener(event: string, callback: Function) {
    this.peerConnection.on(event, callback)
  }

  emit(event: string, ...args: any[]) {
    emitListeners.call(this, event, args[0])
  }
}


export {XMPP}
