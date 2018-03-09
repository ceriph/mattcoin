import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {BlockchainComponent} from "./blockchain/blockchain.component";
import {WalletComponent} from "./wallet/wallet.component";


const routes: Routes = [
  {path: '', redirectTo: '/blockchain', pathMatch: 'full'},
  {path: 'blockchain', component: BlockchainComponent},
  {path: 'wallet', component: WalletComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
