import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ContactProfileService } from '../shared/services/contact-profile.service';

@Component({
  selector: 'app-contact-profile',
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.less'],
  providers: [ContactProfileService]
})
export class ContactProfileComponent implements OnInit {
  private user;
  @Input() private id = '';

  constructor(private contactProfileService: ContactProfileService, private _location: Location) { }

  ngOnInit() {
    this.loadContactProfile();
  }

  private loadContactProfile() {
    this.contactProfileService.getData().subscribe(data => this.user = data);
  }

  private goBack() {
    this._location.back();
  }

}
