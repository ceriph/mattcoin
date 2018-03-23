declare var require: any

export class Hash {

  static hashjs = require('hash.js');

  static digest(data: string): string {
    return this.hashjs.sha256().update(data).digest('hex');
  }
}
