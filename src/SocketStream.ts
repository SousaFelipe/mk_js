import { Socket } from 'net'
import { Subject, fromEvent } from 'rxjs'
import { jetLogger } from 'jet-logger'
import { ConnectionError } from './Error'



export type SocketOptions = {
  host: string,
  port: number
}



export default class SocketStream {


  timeout: number = 5
  socket?: Socket

  
  constructor(timeout: number = 5) {
    this.timeout = timeout
    this.socket = new Socket()
  }


  connect(options: SocketOptions) : SocketStream | null {
    try {
      this.socket = this.socket?.connect(options)
      if (!this.socket) {
        throw new ConnectionError()
      }
      return this
    }
    catch (error) {
      jetLogger().err(error)
      return null
    }
  }
}
