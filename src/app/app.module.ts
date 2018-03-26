import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database/database.module";
import {environment} from "../environments/environment";
import {AngularFireAuth} from "angularfire2/auth/auth";
import {BlockchainComponent} from './blockchain/blockchain.component';
import {BlockchainService} from "./blockchain/blockchain.service";
import {WalletComponent} from './wallet/wallet.component';
import {TransactionService} from "./transactions/transaction.service";
import {TransactionsComponent} from './transactions/transactions.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'Mattcoin'),
    AngularFireDatabaseModule
  ],
  declarations: [
    AppComponent,
    BlockchainComponent,
    WalletComponent,
    TransactionsComponent
  ],
  providers: [
    AngularFireAuth,
    BlockchainService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
