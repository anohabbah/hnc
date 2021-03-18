import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritesListPage } from './favorites-list.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesListPageRoutingModule {}
