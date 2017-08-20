import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PlayerModule } from './player/player.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
