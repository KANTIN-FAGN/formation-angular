import { Routes } from '@angular/router';
import {LandingPageComponent} from "./landing-page/landing-page.component";

export const routes: Routes = [
  { path: 'facesnaps', loadChildren: () => import('./face-snaps/face-snaps.module').then(m => m.FaceSnapsModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', component: LandingPageComponent,}
];
