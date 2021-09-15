import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelsComponent } from './channels/channels.component';
import { LogInComponent } from './log-in/log-in.component';



const routes: Routes = [

  {path: 'channels', component: ChannelsComponent},
  {path: '', component: LogInComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
