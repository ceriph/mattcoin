import {Component, OnInit} from '@angular/core';
import {BlockchainService} from "../blockchain/blockchain.service";
import {TransactionService} from "../transactions/transaction.service";
import {Transaction} from "../transactions/transaction";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  address: string;
  balance: number;

  to: string;
  amount: number;

  message: string;

  constructor(private blockchainService: BlockchainService,
              private transactionService: TransactionService) {
  }

  ngOnInit() {
  }

  calculateBalance() {
    this.blockchainService.list().subscribe(blocks => {
      this.transactionService.list().subscribe(transactions => {

        this.balance = 0;

        // process balance from blocks
        blocks.forEach(block => {
          block.transactions.forEach(transaction => {
            if (this.address === transaction.from) {
              this.balance -= +transaction.amount;
            } else if (this.address === transaction.to) {
              this.balance += +transaction.amount;
            }
          });
        });

        // process balance from unconfirmed pending
        transactions.forEach(transaction => {
          if (this.address === transaction.from) {
            this.balance -= +transaction.amount;
          } else if (this.address === transaction.to) {
            this.balance += +transaction.amount;
          }
        });
      });
    });
  }

  send() {
    if (this.amount > this.balance) {
      this.message = "Insufficient funds.";
    } else {
      this.transactionService.create(new Transaction(this.amount, this.address, this.to, Date.now()));
      this.message = "Transaction sent.";
      this.amount = 0;
      this.to = "";
    }
  }
}
