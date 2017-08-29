import { Component, OnInit, Output } from '@angular/core';
import { TrackService } from '../shared/services/track.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: [
    './player.component.less'
  ],
  providers: [TrackService]
})
export class PlayerComponent implements OnInit {

  private track;
  @Output() trackName = 'none';

  constructor(private trackService: TrackService) {}

  ngOnInit() {
    this.trackService.sayHi().subscribe(data => this.track = data, this.track = undefined);
  }

}
