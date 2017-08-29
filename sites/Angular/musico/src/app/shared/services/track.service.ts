import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API_CONFIG } from './api-config';

@Injectable()
export class TrackService {

  constructor(private http: Http)
  { }

  sayHi() {
    return this.http.get(API_CONFIG.getTrack + '3135556')
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('Произошла ошибка:', error);
    return Promise.reject(error.message || error);
  }

}
