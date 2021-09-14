import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelsComponent } from './channels/channels.component';
import { LogInComponent } from './log-in/log-in.component';



const routes: Routes = [

  {path: '', component: ChannelsComponent},
  {path: 'log-in', component: LogInComponent},

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
