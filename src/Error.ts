

class MikrotikJSError extends Error {
  constructor(message?: string) {
    super(message)
  }
}



export class AddressFamilyError extends MikrotikJSError {
  constructor() {
    super(
      'The address provided is not in IPv4 or IPv6 format'
    )
  }
}


export class ConnectionError extends MikrotikJSError {
  constructor() {
    super(
      'Error when trying to open the connection socket'
    )
  }
}


export class ForbiddenPortError extends MikrotikJSError {
  constructor(port: number, message: string) {
    super(
      `Port ${port} cannot be configured as it is set by default to be used for ${message}`
    )
  }
}
