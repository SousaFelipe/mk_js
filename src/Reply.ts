import { Buffer } from 'node:buffer'



export default abstract class Reply {


  static decode(data: Buffer) {

    if (!data?.length) {
      return []
    }

    const buffer = []

    let index = 0
    let len = 0;
    let b = 0
    
    while (index<data.length) {
      
      len
      b = data[index++]

      if (b & 128) {
        if ((b & 192) == 128) {
          len = ((b & 63) << 8) + data[index++]
        }
        else {
          if ((b & 224) == 192) {
            len = ((b & 31) << 8) + data[index++]
            len = (len << 8) + data[index++]
          }
          else {
            if ((b & 240) == 224) {
              len = ((b & 15) << 8) + data[index++]
              len = (len << 8) + data[index++]
              len = (len << 8) + data[index++]
            }
            else {
              len = data[index++]
              len = (len << 8) + data[index++]
              len = (len << 8) + data[index++]
              len = (len << 8) + data[index++]
            }
          }
        }
      }
      else {
        len = b
      } 
      
      buffer.push(data.subarray(index, index + len).toString('utf8'))
      index += len
    }

    return buffer
  }
}