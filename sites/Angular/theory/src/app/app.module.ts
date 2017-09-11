import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { SortPipe } from './sort.pipe';
import { FilterPipe } from './filter.pipe';
import { BtnDirective } from './btn.directive';
import { ModalComponent } from './modal/modal.component';
import { ShowImageComponent } from './article/show-image/show-image.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    NavComponent,
    HomeComponent,
    SortPipe,
    FilterPipe,
    BtnDirective,
    ModalComponent,
    ShowImageComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'articles',
        component: ArticleComponent
      },
      {
        path: '**',
        component: NotFoundPageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
