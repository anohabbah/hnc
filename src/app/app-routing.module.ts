import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'top-stories',
    loadChildren: () => import('./top-stories/top-stories.module').then( m => m.TopStoriesPageModule)
  },
  {
    path: 'comments/:id', // TODO: add route resolver
    loadChildren: () => import('./comments/comments.module').then( m => m.CommentsPageModule)
  },
  {
    path: 'security',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: '',
    redirectTo: 'top-stories',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
