import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FilterPipe } from './filter.pipe';
import { OrderByPipe } from './order-by.pipe';
import { MenuComponent } from './menu/menu.component';

import { MessagesComponent } from './messages/messages.component';
import { GroupsComponent } from './groups/groups.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactProfileComponent } from './contact-profile/contact-profile.component';
import { CreateUserComponent } from './create-user/create-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    FilterPipe,
    OrderByPipe,
    MenuComponent,
    MessagesComponent,
    GroupsComponent,
    ProfileComponent,
    ContactProfileComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/messages',
        pathMatch: 'full'
      },
      // Page 404
      // {
      //   path: '**',
      //   component: PageNotFound
      // }
      {
        path: 'messages',
        component: MessagesComponent
      },
      {
        path: 'groups',
        component: GroupsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'create-user',
        component: CreateUserComponent
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            component: ProfileComponent
          },
          {
            path: ':id',
            component: ContactProfileComponent
          }
        ]
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
