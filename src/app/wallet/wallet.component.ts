import {Component, OnInit} from '@angular/core';
import {BlockchainService} from "../blockchain/blockchain.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  address: string;
  balance: number;

  constructor(private blockchainService: BlockchainService) {
  }

  ngOnInit() {
  }

  calculateBalance() {
    this.blockchainService.list().subscribe(blocks => {
      this.balance = 0;
      blocks.forEach(block => {
        const regex = new RegExp(this.address + '\\[(\\d*)\\]', "g");
        let match = regex.exec(block.data);
        while (match != null) {
          this.balance += +match[1];
          match = regex.exec(block.data);
        }
      });
    });
  }
}
