import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  private api = 'https://randomuser.me/api/?results=';

  constructor(private http: Http) { }

  getUsers(count: number = 1) {
    return this.http.get(this.api + count).map(res => res.json());
  }

}
