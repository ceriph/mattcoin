import {Block} from "../blockchain/block";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Injectable} from "@angular/core";
import {Transaction} from "./transaction";

@Injectable()
export class TransactionService {

  path = 'transactions';

  transaction: Transaction;

  constructor(private db: AngularFireDatabase) {
  }

  create() {
    this.db.list(this.path).push(transaction);

    const blockchain = this.db.list(this.path);
    blockchain.subscribe(blocks => {
      if (blocks.length === 0) {
        blockchain.push(this.genesisBlock());
      }
    });
    return blockchain;
  }
}
