import { App } from 'vue'
import io from 'socket.io-client'

interface ISocketIOOptions {
  connection: string;
  options: {
    autoConnect: boolean;
    reconnectionAttempts: number; // default infinity
    reconnectionDelay: number;
  };
}

export default {
  install: (app: App, options: ISocketIOOptions): void => {
    const socket = io(options.connection, options.options)
    app.config.globalProperties.$socket = socket

    app.provide('socket', socket)
  }
}
