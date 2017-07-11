import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class UsersService {
    private apiUrl:string = 'http://localhost:3012/users';
    private users:any;
 
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