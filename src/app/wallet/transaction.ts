export class Transaction {
  amount: number;
  from: string;
  to: string;

  constructor(amount, from, to) {
    this.amount = amount;
    this.from = from;
    this.to = to;
  }
}
