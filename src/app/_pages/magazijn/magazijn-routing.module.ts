import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MagazijnComponent} from "./magazijn.component";
import {AuthGuard} from "../../_helpers/auth.guard";
import {VoorraadComponent} from "./voorraad/voorraad.component";
import {EnumRoles} from "../../_models/enum/enumRoles";
import {ControleComponent} from "./controle/controle.component";
import {LogisticComponent} from "./logistic/logistic.component";
import {BestellingenComponent} from "./bestellingen/bestellingen.component";

const routes: Routes = [
  {
    path: '',
    component: MagazijnComponent,
    children: [
      // {
      //   path: '',
      //   component: FinancieelComponent,
      //   canActivate: [AuthGuard],
      // },
      {
        path: 'logistiek',
        component: LogisticComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.LOGISTIEK
          ]
        },
      },
      {
        path: 'controle',
        component: ControleComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.CONTROLE,
          ]
        }
      },
      {
        path: 'voorraad',
        component: VoorraadComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.VOORRAAD
          ]
        }
      },
      {
        path: 'bestellingen',
        component: BestellingenComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.BESTELLINGEN_BEHEREN,
          ]
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class MagazijnRoutingModule {
}
