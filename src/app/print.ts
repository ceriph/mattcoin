import {Transaction} from "./transactions/transaction";

export class Print {

  static print(transaction: Transaction): string {
    return transaction.hash + " - " + transaction.timestamp + " - " +
      transaction.from + "[-" + transaction.amount + "] -> " + transaction.to + "[" + transaction.amount + "]\n";
  }
}
