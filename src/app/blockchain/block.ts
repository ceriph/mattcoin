import {Hash} from "../hash";
import {Transaction} from "../transactions/transaction";
import {Print} from "../print";

export class Block {
  index: number;
  timestamp: number;
  transactions: Transaction[];
  previous: string;
  hash: string;

  constructor(index: number, timestamp: number, transactions: Transaction[], previous: string, hash: string = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previous = previous;

    if (hash === "") {
      const data = this.transactions.map(transaction => {
        return Print.print(transaction);
      }).reduce((previousValue, elem) => previousValue + elem);

      this.hash = Hash.digest(this.index + this.timestamp + data + this.previous);
    }
  }
}
