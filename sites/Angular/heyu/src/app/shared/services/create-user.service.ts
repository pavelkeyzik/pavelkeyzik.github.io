import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CreateUserService {
    private apiUrl:string = 'https://nodejs-messenger-api.herokuapp.com/users';

    constructor(private http: Http) {}

    create(object) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers });

        this.http.post(this.apiUrl, object, options)
                 .toPromise()
                 .then(res => res.json().data)
                 .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Произошла ошибка:', error);
        return Promise.reject(error.message || error);
    }

}