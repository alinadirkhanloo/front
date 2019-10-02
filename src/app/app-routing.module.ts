import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SidenavModule } from './components/sidenav/sidenav.module';

const routes: Routes = [
  {

    path: '',
    loadChildren: () =>
      import('./components/pages/login/login.module').then(
        m => m.LoginModule
      )
  },
  {
    path: 'sidenav',
    component: SidenavComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./components/pages/dashboard/dashboard.module').then(
            m=>m.DashboardModule
          )
       },
       {
         path: 'users',
         loadChildren: () => 
           import('./components/pages/users/users.module').then(
             m=>m.UsersModule
           )
       },
    ]  
  }
];




@NgModule({
  imports: [RouterModule.forRoot(routes),SidenavModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
