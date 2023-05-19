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
  public _listener: {};
  protected _room: string;


  constructor() {
    this._room=''
    this._listener = {}
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
      this.connection.addHandler(this.addHandlerResponce, null, 'presence')
      this.emit('connected')
    }
  }

  addHandler = (stanza: any) => {
    console.log(stanza, 'message')
    return true
  }
  getId = () => {
    return this.connection.jid.split('/')[1]
  }
  addHandlerResponce = (stanza: any) => {
console.log(stanza ,'stanza')
    this.inviteFocus()
    return true
  }

  entranceToRoom(roomName: string) {
    this.functionCreatedRoom(roomName)
  }

  createRoom(roomName: string) {
    this.functionCreatedRoom(roomName)
    this.validateCreateRoom(roomName)
  }

  functionCreatedRoom(roomName: string) {
    this._room=roomName
    const message = new Strophe.Builder('presence', {
      from: `${this.connection.jid}`,
      id: this.getId(),
      to: `${roomName}@conference.prosolen.net/${this.connection.jid.split('/')[1]}`
    }).c('x', {
      xmlns: 'http://jabber.org/protocol/muc'
    })
    this.connection.send(message)
  }

  inviteFocus() {
    const message = new Strophe.Builder('message', {
      to: `${this._room}@conference.prosolen.net`
    }).c('x', {
      xmlns:'http://jabber.org/protocol/muc#user'
    }).c('invite', {
      to: 'hecate@shakespeare.lit'
    })

    this.connection.send(message)
  }
  validateCreateRoom(roomName: string) {
    // <message
    //   from='wiccarocks@shakespeare.lit/laptop'
    // id='hgn27af1'
    // to='coven@chat.shakespeare.lit/firstwitch'
    // type='chat'>
    //   <body>I'll give thee a wind.</body>
    // <x xmlns='http://jabber.org/protocol/muc#user' />
    //   </message>

    const message = new Strophe.Builder('message', {
      from: `${this.connection.jid}`,
      id: this.getId(),
      to: `focus@prosolen.net/focus`,
      type: 'chat',
    }).c('body').t('proba').up().c('x', {
      xmlns: 'http://jabber.org/protocol/muc#user'
    })
    this.connection.send(message)
  }

  getRoom() {
    const message = new Strophe.Builder('iq', {
      to: 'conference.prosolen.net',
      id: this.getId(),
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
