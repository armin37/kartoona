import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// import {AuthGuard} from './auth.guard';
// import {UnauthGuard} from './unauth.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'home',
    pathMatch: 'full',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'movie/:slug',
    loadChildren: () => import('./pages/movie/movie.module').then(m => m.MovieModule)
  },
  // {
  //   path: 'movie/:slug/:episode',
  //   loadChildren: () => import('./pages/movie/movie.module').then(m => m.MovieModule)
  // },
  // {
  //   path: 'genre-tag/:type/:slug',
  //   loadChildren: () => import('./pages/genre-tag/genre-tag.module').then(m => m.GenreTagModule)
  // },
  // {
  //   path: 'category/:category',
  //   loadChildren: () => import('./pages/genre-tag/genre-tag.module').then(m => m.GenreTagModule)
  // }, {
  //   path: 'contact',
  //   loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
  // },
  // {
  //   path: 'pricing',
  //   loadChildren: () => import('./pages/pricing/pricing.module').then(m => m.PricingModule),
  //   // canActivate: [AuthGuard]
  // },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    // canActivate: [UnauthGuard]
  },
  // {
  //   path: 'about-us',
  //   pathMatch: 'full',
  //   loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule)
  // },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
  //   // canActivate: [AuthGuard]
  // },
  // {
  //   path: 'tag/:slug',
  //   loadChildren: () => import('./pages/tag/tag.module').then(m => m.TagModule)
  // },
  // {
  //   path: 'tag/:slug/:page',
  //   loadChildren: () => import('./pages/tag/tag.module').then(m => m.TagModule)
  // },
  // {
  //   path: 'genre/:slug',
  //   loadChildren: () => import('./pages/genre/genre.module').then(m => m.GenreModule)
  // },
  // {
  //   path: 'genre/:slug/:page',
  //   loadChildren: () => import('./pages/genre/genre.module').then(m => m.GenreModule)
  // },
  // {
  //   path: 'filter/:slug',
  //   loadChildren: () => import('./pages/filter/filter.module').then(m => m.FilterModule)
  // },
  // {
  //   path: 'filter/:slug/:page',
  //   loadChildren: () => import('./pages/filter/filter.module').then(m => m.FilterModule)
  // },
  // {
  //   path: 'pg/:slug',
  //   loadChildren: () => import('./pages/pg/pg.module').then(m => m.PgModule)
  // },
  // {
  //   path: 'pg/:slug/:page',
  //   loadChildren: () => import('./pages/pg/pg.module').then(m => m.PgModule)
  // },
  // {
  //   path: 'blog',
  //   loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
  // },
  // {
  //   path: 'blog/:page',
  //   loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
  // },
  // {
  //   path: 'post/:slug',
  //   loadChildren: () => import('./pages/blog-single/blog-single.module').then(m => m.BlogSingleModule)
  // },
  // {
  //   path: 'blog/tag/:tag-slug',
  //   loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
  // },
  // {
  //   path: 'blog/tag/:tag-slug/:page',
  //   loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
  // },
  // {
  //   path: 'blog/category/:category-slug',
  //   loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
  // },
  // {
  //   path: 'blog/category/:category-slug/:page',
  //   loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
  // },
  // {
  //   path: 'payment-callback',
  //   loadChildren: () => import('./pages/payment-callback/payment-callback.module').then(m => m.PaymentCallbackModule)
  // },
  // {
  //   path: 'payment-callback/:id',
  //   loadChildren: () => import('./pages/payment-callback/payment-callback.module').then(m => m.PaymentCallbackModule)
  // },
  // {
  //   path: '404',
  //   loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  // },
  // {
  //   path: '**',
  /*resolve: {
    path: PathResolveService
  },*/
  // loadChildren: () => import('./pages/resolver/resolver.module').then(m => m.ResolverModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
