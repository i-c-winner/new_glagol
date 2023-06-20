import getRandomText from "../plugins/getRandomText";
import { onListeners, emitListeners } from "../plugins/createListeners";
import PeerConnection from "../WebRtc/WebRtc";
import { debounce } from "@mui/material";

const { Strophe }: any = require('strophe.js')
//@ts-ignore
const register: any = require('strophe-plugin-register')

class XMPP {
  public xmpp: any;
  public conn: any;
  private connection: any;
  private peerConnection: PeerConnection;
  private password: string;
  private userName: string;
  public _listener: {};
  protected _room: string;


  constructor() {
    this._room = ''
    this._listener = {}
    //@ts-ignore
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
      console.info("registered!");
      // calling login will authenticate the registered JID.
      this.connection.authenticate();
    } else if (status === Strophe.Status.CONFLICT) {
      console.info("Contact already existed!");
    } else if (status === Strophe.Status.NOTACCEPTABLE) {
      console.info("Registration form not properly filled out.")
    } else if (status === Strophe.Status.REGIFAIL) {
      console.info("The Server does not support In-Band Registration")
    } else if (status === Strophe.Status.CONNECTED) {
      this.connection.addHandler(this.addHandlerIq, null, 'iq')
      this.connection.addHandler(this.addHandlerMessage, null, 'message')
      this.connection.addHandler(this.addHandlerResponce, null, 'presence')
      this.emit('connected')
    }
  }
  /**
   * Слушатель Xmpp для типов "message"
   * @param {any} stanza 
   * @returns {boolean} true
   */
  addHandlerMessage = (stanza: any): boolean => {
    const type = stanza.getAttribute('type')
    const subject = stanza.getElementsByTagName('subject')
    const body = stanza.getElementsByTagName('body')
    const message = Strophe.getText(body[0])
    if (Strophe.getText(subject[0]) === "groupmessage") {
      this.emit("receivingMessage", JSON.parse(window.atob(message)))
    }
    if (message === 'add_track') {
      this.addVideo()
    } else {
      if (type === 'chat') {
        this.setRemoteDescription(message)
      }
    }
    return true
  }
  getId = () => {
    return this.connection.jid.split('/')[1]
  }
  //@ts-ignore
  addHandlerResponce = (stanza: any) => {
    return true
  }

  /**
 * Слушатель Xmpp для типов "iq"
 * @param {any} stanza 
 * @returns {boolean} true
 */
  addHandlerIq = (stanza: any) => {
    return true
  }

  entranceToRoom(roomName: string) {
    this.functionCreatingOrEnterToRoom(roomName)
  }

  createRoom(roomName: string) {
    this.functionCreatingOrEnterToRoom(roomName)
    this.validateCreateRoom(roomName)
  }

  doSignaling = (...args: [...any[]]) => {
    const message = new Strophe.Builder('message', {
      to: 'admin_cs@prosolen.net',
      type: 'chat'
    }).c('body').t(args[0][0])
    this.connection.send(message)
  }

  setRemoteDescription(description: string) {
    const rtcsd = new RTCSessionDescription(JSON.parse(window.atob(description)))
    this.peerConnection.remoteStreams = rtcsd
    console.info("Received from remote remote Description")
    try {
      this.peerConnection.pc.setRemoteDescription(rtcsd)
    } catch (e) {
      alert(e)
    }
  }

  addVideo() {
    this.peerConnection.pc.addTransceiver('video', { 'direction': 'recvonly' })
    this.peerConnection.pc.addTransceiver('audio', { 'direction': 'recvonly' })
    this.peerConnection.pc.createOffer({ 'iceRestart': true }).then(offer => {
      this.peerConnection.pc.setLocalDescription(offer)
      setTimeout(() => {
        this.peerConnection.setRemoteStreams()
        this.emit('updatedRemoteStreams', true)
      }, 10000)
    })
  }

  functionCreatingOrEnterToRoom(roomName: string) {
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

  sendMessageToFocus() {
    const message = new Strophe.Builder('message', {
      from: `${this.connection.jid}`,
      id: this.getId(),
      to: `focus@prosolen.net/focus`, // to: `${this._room}@conference.prosolen.net/${this.connection.jid.split('/')[1]}`,
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
  /**
   * Запросить список комнат из prosody сервера
   * п.6.3 ХЕР 0045
   * @returns {void}    * 
   */
  getRooms(): void {
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

  /**
   * Отправляем сообщение всем участникам
   * @param {object} chatMessage объект с данными сообщения
   */
  messageToAllOccupants(chatMessage: { author: string, text: string, id: string }) {
    debugger
    const text = JSON.stringify({
      "author": chatMessage.author,
      "text": chatMessage.text,
      "id": chatMessage.id
    })
    const message = new Strophe.Builder('message', {
      to: `${this._room}@conference.prosolen.net`,
      id: this.getId(),
      from: `${this.connection.jid}`,
      type: 'groupchat'
    }).c('subject').t('groupmessage').up().c('body').t(window.btoa(text))
    this.connection.send(message)
  }
  /**
   * Отправка файлов
   * @ param {any} file отправляемый файл
   * @ returns {void}
   */
  sendFile(file: any): void {
    console.log(file);
  }

  xmppOnListener(event: string, callback: Function) {
    onListeners.call(this, event, callback)
  }

  getLocalStream() {
    return this.peerConnection.getLocalStream()
  }

  getRemoteStreams() {
    return this.peerConnection.getRemoteStreams()
  }

  changeVisibleVideo() {
    return this.peerConnection.changeVisibleVideo()
  }
  changeAudio() {
    return this.peerConnection.changeAudio()
  }
  stopVideo() {
    return this.peerConnection.stopVideo()
  }

  peerOnListener(event: string, callback: Function) {
    this.peerConnection.on(event, callback)
  }

  emit(event: string, ...args: any[]) {
    emitListeners.call(this, event, args[0])
  }
}


export { XMPP }
