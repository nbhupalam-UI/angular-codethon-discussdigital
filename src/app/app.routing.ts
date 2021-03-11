import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { ArticlesComponent } from "./articles.component";


const routes: Routes = [
  { path: "", component: ArticlesComponent },
  {
    path: "article/:id",
    loadChildren: "./../+article/article.module#ArticleModule"
  },
  {
    path: "profile",
    loadChildren: "./../profile/profile.module#ProfileModule"
  },
  {
    path: "dashboard",
    loadChildren: "./../dashboard/dashboard.module#DashboardModule"
  },
  {
    path: "ask",
    loadChildren: "./../ask/ask.module#AskModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { useHash: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {} 