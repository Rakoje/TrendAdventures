import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnglishComponent } from './english/english.component';
import { MneComponent } from './mne/mne.component';

const routes: Routes = [
  { path: '', component: EnglishComponent },
  { path: 'mne', component: MneComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
