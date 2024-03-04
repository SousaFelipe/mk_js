import net from 'net'

import { makeID } from './Utils'
import { BLOCKED_INSECURE_PORTS } from './utils/constants'
import { AddressFamilyError, ForbiddenPortError } from './Error'
import SocketStream, { SocketOptions } from './SocketStream'



export type ReplyBegins = '!re' | '!done' | '!trap' | '!fatal'



export default class Client {


  private options: SocketOptions = {
    host: '192.168.88.1',
    port: 8728
  }

  private id: string = ''
  private sock?: SocketStream


  /**
   * @param host IP address of host. can be IPv4 or IPv6
   * @param port Port to connect with host, default is 8728
   * @param timeout Connection Timeout in seconds
   */
  constructor(host: string, port: number, timeout: number = 5) {

    if (!net.isIPv4(host) && !net.isIPv6(host)) {
      throw new AddressFamilyError()
    }

    const blockedPort = (BLOCKED_INSECURE_PORTS as any)[port]

    if (blockedPort) {
      throw new ForbiddenPortError(port, blockedPort)
    }
    
    this.id = makeID(32)
    this.sock = new SocketStream(timeout)
    this.options = { host, port }
  }


  getID() {
    return this.id
  }


  connect() {
    const promise = new Promise<SocketStream>((resolve, rejects) => {
      const connection = this.sock?.connect(this.options)
    })
    return promise
  }
}
