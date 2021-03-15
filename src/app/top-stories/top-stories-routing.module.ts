import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopStoriesPage } from './top-stories.page';

const routes: Routes = [
  {
    path: '',
    component: TopStoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopStoriesPageRoutingModule {}
