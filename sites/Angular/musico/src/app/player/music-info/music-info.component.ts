import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-info',
  templateUrl: './music-info.component.html',
  styleUrls: ['./music-info.component.less']
})
export class MusicInfoComponent implements OnInit {

  trackName = '...';

  constructor() { }

  ngOnInit() {
  }

}
