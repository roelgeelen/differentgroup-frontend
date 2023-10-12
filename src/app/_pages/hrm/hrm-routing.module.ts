import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HrmComponent} from "./hrm.component";
import {AuthGuard} from "../../_helpers/auth.guard";
import {EnumRoles} from "../../_models/enum/enumRoles";
import {OntwikkelingenComponent} from "./ontwikkelingen/ontwikkelingen.component";
import {UserComponent} from "./ontwikkelingen/user/user.component";
import {ConversationComponent} from "./ontwikkelingen/user/conversation/conversation.component";

const routes: Routes = [
  {
    path: '',
    component: HrmComponent,
    children: [
      // {
      //   path: '',
      //   component: FinancieelComponent,
      //   canActivate: [AuthGuard],
      // },
      {
        path: 'werknemers',
        component: OntwikkelingenComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.LOGISTIEK
          ]
        },
      },
      {
        path: 'werknemers/:userId',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.LOGISTIEK
          ]
        },
      },
      {
        path: 'werknemers/:userId/ontwikkelingen/create',
        component: ConversationComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.LOGISTIEK
          ]
        },
      },
      {
        path: 'werknemers/:userId/ontwikkelingen/:id/update',
        component: ConversationComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            EnumRoles.LOGISTIEK
          ]
        },
      },
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

export class HrmRoutingModule {
}
