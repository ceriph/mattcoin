import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Block} from "./block";

@Injectable()
export class BlockchainService {

  path = 'blocks';

  constructor(private db: AngularFireDatabase) {
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

  private genesisBlock(): Block {
    return new Block(0, Date.now(), "matt[1000]", "0");
  }
}
