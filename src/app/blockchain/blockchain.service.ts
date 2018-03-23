import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Block} from "./block";
import {TransactionService} from "../transactions/transaction.service";
import {Transaction} from "../transactions/transaction";

@Injectable()
export class BlockchainService {

  path = 'blocks';

  constructor(private db: AngularFireDatabase,
              private transactionService: TransactionService) {
  }

  list(): FirebaseListObservable<Block[]> {
    const blockchain = this.db.list(this.path);
    blockchain.subscribe(blocks => {
      if (blocks.length === 0) {
        blockchain.push(this.genesisBlock());
      }
    });
    return blockchain;
  }

  create() {
    let syncTransactions = false
    this.transactionService.list().subscribe(transactions => {
      if (!syncTransactions) {
        const blockchain = this.list();
        let syncBlockchain = false;
        blockchain.subscribe(blocks => {
          if (!syncBlockchain) {
            const index = blocks.length;
            blockchain.push(new Block(index, Date.now(), transactions, blocks[blocks.length - 1].hash));
            transactions.forEach(transaction => this.transactionService.remove(transaction.hash));
            syncBlockchain = true;
          }
        });
        syncTransactions = true;
      }
    });
  }

  private genesisBlock(): Block {
    return new Block(0, Date.now(), [ new Transaction(1000000, "init", "matt", Date.now()) ], "0");
  }
}
