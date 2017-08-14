import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

import { SortPipe } from './shared/pipes/sort.pipe';
import { FilterPipe } from './shared/pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessagesComponent,
    ConversationsComponent,
    SideMenuComponent,
    SortPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
      },
      {
        path: 'conversations/:me_login',
        component: ConversationsComponent
      },
      {
        path: 'messages/:me_login/:user_login',
        component: MessagesComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
