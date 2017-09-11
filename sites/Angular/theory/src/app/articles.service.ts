import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticlesService {

  private apiUrl = 'https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=204bbc9e22c94f3da363923dae92f6fc';

  constructor(private http: Http) { }

  getArticles() {
    return this.http.get(this.apiUrl).map(res => res.json());
  }

}
