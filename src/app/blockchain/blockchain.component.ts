import {Component, OnInit} from '@angular/core';
import {BlockchainService} from "./blockchain.service";
import {FirebaseListObservable} from "angularfire2/database";
import {Block} from "./block";

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent implements OnInit {

  blockchain: FirebaseListObservable<Block[]>;

  constructor(private blockchainService: BlockchainService) {
  }

  ngOnInit() {
    this.blockchain = this.blockchainService.list();
  }

  mine() {
    this.blockchainService.create();
  }
}
