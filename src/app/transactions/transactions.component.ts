import {Component, OnInit} from '@angular/core';
import {TransactionService} from "./transaction.service";
import {FirebaseListObservable} from "angularfire2/database";
import {Transaction} from "./transaction";
import {BlockchainService} from "../blockchain/blockchain.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  pending: FirebaseListObservable<Transaction[]>;
  confirmed: Transaction[];

  constructor(private transactionService: TransactionService,
              private blockchainService: BlockchainService) {
  }

  ngOnInit() {
    this.pending = this.transactionService.list();
    this.blockchainService.list().subscribe(blocks => {
      this.confirmed = [];
      blocks.forEach(block => {
        block.transactions.forEach(transaction => {
          this.confirmed.push(transaction);
        });
      });
    });
  }
}
