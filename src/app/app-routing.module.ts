import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./_pages/home/home.component";
import {AuthGuard} from "./_helpers/auth.guard";
import {EnumRoles} from "./_models/enum/enumRoles";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'verkoop',
    loadChildren: () => import('./_pages/verkoop/verkoop.module').then(m => m.VerkoopModule),
    canActivate: [AuthGuard],
    data: {
      roles: [
        EnumRoles.OFFICE,
        EnumRoles.ICT,
        EnumRoles.ENGINEERING,
        EnumRoles.ADMINISTRATION,
      ]
    },
  },
  {
    path: 'planning',
    loadChildren: () => import('./_pages/planning/planning.module').then(m => m.PlanningModule),
    canActivate: [AuthGuard],
    data: {
      roles: [
        EnumRoles.ENGINEERING,
        EnumRoles.ADMINISTRATION,
        EnumRoles.PRODUCTION,
        EnumRoles.PLANNING,
        EnumRoles.ICT
      ]
    },
  },
  {
    path: 'magazijn',
    loadChildren: () => import('./_pages/magazijn/magazijn.module').then(m => m.MagazijnModule),
    canActivate: [AuthGuard],
    data: {
      roles: [
        EnumRoles.ENGINEERING,
        EnumRoles.ADMINISTRATION,
        EnumRoles.PRODUCTION,
        EnumRoles.PLANNING,
        EnumRoles.ICT
      ]
    },
  },
  {
    path: 'rapportage',
    loadChildren: () => import('./_pages/rapportage/rapportage.module').then(m => m.RapportageModule),
    canActivate: [AuthGuard],
    data: {
      roles: [
        EnumRoles.ADMINISTRATION,
        EnumRoles.ICT
      ]
    },
  },
  {
    path: 'admin',
    loadChildren: () => import('./_pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: {
      roles: [
        EnumRoles.ADMIN
      ]
    },
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
