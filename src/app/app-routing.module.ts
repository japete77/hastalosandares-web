import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HaMalagaComponent } from './ha-malaga/ha-malaga.component';
import { TabernaMalagaComponent } from './taberna-malaga/taberna-malaga.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ha-malaga', component: HaMalagaComponent },
  { path: 'taberna-malaga', component: TabernaMalagaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
