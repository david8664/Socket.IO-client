import { io } from "socket.io-client";

export default {
    socket: io(),
    connect : function () {this.socket = io ("http://localhost:4000",{ transports: ['websocket'] })},
    disconnect : ()=> {}
}