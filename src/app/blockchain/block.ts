declare var require: any

export class Block {
  index: number;
  timestamp: number;
  data: string;
  previous: string;
  hash: string;

  constructor(index: number, timestamp: number, data: string, previous: string, hash: string = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previous = previous;

    if (hash === "") {
      const hashjs = require('hash.js');
      this.hash = hashjs.sha256().update(this.index + this.timestamp + this.data + this.previous).digest('hex');
    }
  }
}
