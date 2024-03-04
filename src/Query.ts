

export default abstract class Query {


  static encode(word: string) : string {

    var offset: number = 0
    var data: Buffer | null = null
    var len: number = Buffer.byteLength(word)

    if (len < 0x80) {
      //@ts-ignore
      data = Buffer.from(len + 1)
      data[offset++] = len
    }
    else if (len < 0x4000) {
      //@ts-ignore
      data = Buffer.from(len + 2)
      len |= 0x8000
      data[offset++] = (len >> 8) & 0xff
      data[offset++] = len & 0xff
    }
    else if (len < 0x200000) {
      //@ts-ignore
      data = Buffer.from(len + 3)
      len |= 0xC00000
      data[offset++] = (len >> 16) & 0xff
      data[offset++] = (len >> 8) & 0xff
      data[offset++] = len & 0xff
    }
    else if (len < 0x10000000) {
      //@ts-ignore
      data = Buffer.from(len + 4)
      len |= 0xE0000000
      data[offset++] = (len >> 24) & 0xff
      data[offset++] = (len >> 16) & 0xff
      data[offset++] = (len >> 8) & 0xff
      data[offset++] = len & 0xff
    }
    else {
      //@ts-ignore
      data = Buffer.from(len + 5)
      data[offset++] = 0xF0
      data[offset++] = (len >> 24) & 0xff
      data[offset++] = (len >> 16) & 0xff
      data[offset++] = (len >> 8) & 0xff
      data[offset++] = len & 0xff
    }

    return data.toString('utf-8', len)
  }
}
