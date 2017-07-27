import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class MessagesService {
    private apiUrl:string = 'https://nodejs-messenger-api.herokuapp.com/messages';
 
    constructor(private http: Http) {}
     
    getData() {
        return this.http.get(this.apiUrl)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Произошла ошибка:', error);
        return Promise.reject(error.message || error);
    }
}