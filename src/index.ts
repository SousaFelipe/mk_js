import { SocketOptions } from './SocketStream'
import Client from './Client'



export default abstract class MikrotikJS {
  
  static client(socketOptions: SocketOptions) : Client {
    return new Client(socketOptions.host, socketOptions.port)
  }
}
