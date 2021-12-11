import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageComponent } from './message/message.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ThreadComponent } from './thread/thread.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },

  {
    path: 'dashboard/:id',
    component: DashboardComponent,
    children: [
      {
        path: 'chat/:id',
        component: MessageComponent,
        children: [
          {
            path: 'thread/:id',
            component: ThreadComponent,
          },
        ],
      },
      {
        path: 'channel/:id',
        component: MessageComponent,
        children: [
          {
            path: 'thread/:id',
            component: ThreadComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
