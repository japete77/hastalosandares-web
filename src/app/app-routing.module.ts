import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HaMalagaComponent } from './ha-malaga/ha-malaga.component';
import { TabernaMalagaComponent } from './taberna-malaga/taberna-malaga.component';
import { TabernaMalagaEnComponent } from './taberna-malaga-en/taberna-malaga-en.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'taberna-malaga', component: TabernaMalagaComponent },
  { path: 'taberna-malaga-en', component: TabernaMalagaEnComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
