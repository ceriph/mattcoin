import {Hash} from "../hash";

export class Transaction {
  amount: number;
  from: string;
  to: string;
  timestamp: number;
  hash: string;

  constructor(amount, from, to, timestamp, hash = "") {
    this.amount = amount;
    this.from = from;
    this.to = to;
    this.timestamp = timestamp;

    if (hash === "") {
      this.hash = Hash.digest(this.amount + this.from + this.to + this.timestamp);
    }
  }
}
