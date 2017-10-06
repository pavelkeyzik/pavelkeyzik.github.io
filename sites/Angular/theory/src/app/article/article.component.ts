import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { ShowImageComponent } from './show-image/show-image.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less'],
  providers: [ArticlesService]
})
export class ArticleComponent implements OnInit {
  public articles;
  public search;
  public sort = 'new';

  @ViewChild(ShowImageComponent) showFullImage: ShowImageComponent;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.articlesService.getArticles().subscribe(data => this.articles = data.articles,
      error => this.articles = undefined);
  }

  showImage(url: string) {
    this.showFullImage.show(url);
  }

  toggleSort() {
    if (this.sort === 'new') {
      this.sort = 'old';
    } else {
      this.sort = 'new';
    }
  }

}
