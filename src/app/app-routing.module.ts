import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./_pages/home/home.component";
import {AuthGuard} from "./_helpers/auth.guard";
import {EnumRoles} from "./_models/enum/enumRoles";
import {WallofshameComponent} from "./_pages/wallofshame/wallofshame.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'wallofshame',
    component: WallofshameComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        EnumRoles.WIDGETS
      ]
    },
  },
  {
    path: 'verkoop',
    loadChildren: () => import('./_pages/verkoop/verkoop.module').then(m => m.VerkoopModule),
    canActivate: [AuthGuard],
    data: {
      roles: [
        EnumRoles.AFSPRAKEN,
        EnumRoles.INMETEN,
        EnumRoles.FORMULIEREN,
      ]
    },
  },
  {
    path: 'planning',
    loadChildren: () => import('./_pages/planning/planning.module').then(m => m.PlanningModule),
    canActivate: [AuthGuard],
    data: {
      roles: [
        EnumRoles.TRACKING,
        EnumRoles.AFSPRAKEN,
        EnumRoles.PRODUCTIE,
        EnumRoles.GEPRODUCEERD,
      ]
    },
  },
  {
    path: 'magazijn',
    loadChildren: () => import('./_pages/magazijn/magazijn.module').then(m => m.MagazijnModule),
    canActivate: [AuthGuard],
    data: {
      roles: [
        EnumRoles.LOGISTIEK,
        EnumRoles.CONTROLE,
        EnumRoles.VOORRAAD,
        EnumRoles.BESTELLINGEN_BEHEREN
      ]
    },
  },
  {
    path: 'rapportage',
    loadChildren: () => import('./_pages/rapportage/rapportage.module').then(m => m.RapportageModule),
    canActivate: [AuthGuard],
    data: {
      roles: [
        EnumRoles.RAPPORTAGE,
        EnumRoles.FINANCIEEL
      ]
    },
  },
  {
    path: 'admin',
    loadChildren: () => import('./_pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: {
      roles: [
        EnumRoles.BERICHTEN_BEHEREN,
        EnumRoles.ROLLEN_BEHEREN
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
