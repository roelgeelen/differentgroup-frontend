import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MagazijnComponent} from "./magazijn.component";
import {AuthGuard} from "../../_helpers/auth.guard";
import {VoorraadComponent} from "./voorraad/voorraad.component";
import {EnumRoles} from "../../_models/enum/enumRoles";
import {ControleComponent} from "./controle/controle.component";

const routes: Routes = [
  {
    path: '',
    component: MagazijnComponent,
    children: [
      // {
      //   path: '',
      //   component: DashboardComponent,
      //   canActivate: [AuthGuard],
      // },
      {
        path: 'controle',
        component: ControleComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.ENGINEERING,
            EnumRoles.ADMINISTRATION,
            EnumRoles.PLANNING,
            EnumRoles.ICT
          ]
        }
      },
      {
        path: 'voorraad',
        component: VoorraadComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.ENGINEERING,
            EnumRoles.ADMINISTRATION,
            EnumRoles.PLANNING,
            EnumRoles.ICT
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
