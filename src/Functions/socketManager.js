import { io } from "socket.io-client";

const socketManager = {
  socket: io("http://localhost:4000", { transports: ["websocket"] }),

  connect: function () {
    this.socket.connect();
  },

  disconnect: function () {
    this.socket.disconnect();
  },
};

export default socketManager;
