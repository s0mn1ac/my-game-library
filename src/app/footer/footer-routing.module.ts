import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterPage } from './footer.page';

const routes: Routes = [
  {
    path: '',
    component: FooterPage,
    children: [
      {
        path: 'board',
        loadChildren: () => import('../pages/board/board.module').then(m => m.BoardPageModule)
      },
      {
        path: 'library',
        loadChildren: () => import('../pages/library/library.module').then(m => m.LibraryPageModule)
      },
      {
        path: 'lists',
        loadChildren: () => import('../pages/lists/lists.module').then(m => m.ListsPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/board',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/board',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class FooterPageRoutingModule {}
