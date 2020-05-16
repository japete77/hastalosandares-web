import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Data } from 'src/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HaMalagaComponent } from './ha-malaga/ha-malaga.component';

export function initializeApp(data: Data) {
  return () => data.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HaMalagaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    Data,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Data],
      multi: true
    },
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
