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
    this._room = ''
    this._listener = {}
    this.initialized = false
    this.conn = null
    this.connection = new Strophe.Connection('https://xmpp.prosolen.net:5281/http-bind')
    this.peerConnection = new PeerConnection()
    this.password = getRandomText(7)
    this.userName = getRandomText(5)
    this.peerConnection.on('doSignaling', this.doSignaling)
  }

  init() {
    this.connection.register.connect("@prosolen.net", this.callbackRegistry)
  }

  peerInit() {
    this.peerConnection.init()
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
      this.connection.addHandler(this.addHandlerMessage, null, 'message')
      this.connection.addHandler(this.addHandlerResponce, null, 'presence')
      this.emit('connected')
    }
  }

  addHandlerMessage = (stanza: any) => {
    const type = stanza.getAttribute('type')
    console.log(stanza, type, 'message')
    return true
  }
  getId = () => {
    return this.connection.jid.split('/')[1]
  }
  addHandlerResponce = (stanza: any) => {
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

  doSignaling = (...args: [...any[]]) => {
    console.log(args[0])
    const message = new Strophe.Builder('message', {
      to: 'admin_cs@prosolen.net',
      type: 'chat'
    }).c('body').t(args[0][0])
    this.connection.send(message)
  }

  functionCreatedRoom(roomName: string) {
    this._room = roomName
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
      from: `${this.connection.jid}`,
      id: this.getId(),
      to: `focus@prosolen.net/focus`,
      // to: `${this._room}@conference.prosolen.net/${this.connection.jid.split('/')[1]}`,
      type: 'chat'
    }).c('body').t('Proba').up().c('x', {
      xmlns: 'http://jabber.org/protocol/muc#user'
    })
    this.connection.send(message)
  }

  validateCreateRoom(roomName: string) {
    const message = new Strophe.Builder('iq', {
      from: `${this.connection.jid}`,
      id: this.getId(),
      to: `${roomName}@conference.prosolen.net`,
      type: 'set',
    }).c('query', {
      xmlns: 'http://jabber.org/protocol/muc#owner'
    }).c('x', {
      xmlns: 'jabber:x:data',
      type: 'submit'
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