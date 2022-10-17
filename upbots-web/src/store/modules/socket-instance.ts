import io from 'socket.io-client'

export const socketInstance = io(process.env.VUE_APP_ROOT_API as string, {
  autoConnect: false,
  reconnectionAttempts: 40, // default: infinity
  reconnectionDelay: 4000
})
