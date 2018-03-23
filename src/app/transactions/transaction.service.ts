import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import {Injectable} from "@angular/core";
import {Transaction} from "./transaction";

/**
 * This acts as the sort of 'mempool' for unconfirmed pending
 */
@Injectable()
export class TransactionService {

  path = 'transactions';

  constructor(private db: AngularFireDatabase) {
  }

  create(transaction: Transaction) {
    this.db.object(this.path).update({
      [transaction.hash]: transaction
    });
  }

  list(): FirebaseListObservable<Transaction[]> {
    return this.db.list(this.path);
  }

  remove(hash: string) {
    this.db.list(this.path).remove(hash);
  }

  print(transaction: Transaction): string {
    return transaction.hash + " - " + transaction.timestamp + " - " +
      transaction.from + "[-" + transaction.amount + "] -> " + transaction.to + "[" + transaction.amount + "]\n";
  }
}
