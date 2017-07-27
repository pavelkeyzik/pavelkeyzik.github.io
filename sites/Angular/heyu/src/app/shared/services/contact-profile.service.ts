import { Http, Response } from '@angular/http';
import { Injectable, Input } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
import { ActivatedRoute } from '@angular/router';
@Injectable()
export class ContactProfileService {
    private apiUrl:string = 'https://nodejs-messenger-api.herokuapp.com/users/';
    @Input() id = '';

    constructor(private http: Http, private route: ActivatedRoute) {}
     
    getData() {
        this.id = this.route.snapshot.params['id'];
        return this.http.get(this.apiUrl + this.id)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Произошла ошибка:', error);
        return Promise.reject(error.message || error);
    }
}