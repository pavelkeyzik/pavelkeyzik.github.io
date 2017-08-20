import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { PlayerProgressComponent } from './player-progress/player-progress.component';
import { MusicInfoComponent } from './music-info/music-info.component';
import { PlayerControllsComponent } from './player-controlls/player-controlls.component';
import { VolumeControllComponent } from './volume-controll/volume-controll.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PlayerComponent,
    PlayerProgressComponent,
    MusicInfoComponent,
    PlayerControllsComponent,
    VolumeControllComponent
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule { }
