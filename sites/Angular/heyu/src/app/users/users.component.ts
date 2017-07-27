import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import { User } from './user';

import { FilterPipe } from '../filter.pipe';
import { OrderByPipe } from '../order-by.pipe';

@Component({
    selector: 'users',
    templateUrl: 'users.component.html',
    styleUrls: [
        'users.component.less'
    ],
    providers: [UsersService]
})
export class UsersComponent implements OnInit {
    private users: User[];
    private searchTerm: string;
    private sectionTitle:string = 'Contacts';

    constructor(private usersService: UsersService, private router: Router) {}

    ngOnInit(){
        this.loadListOfUsers();
    }

    private loadListOfUsers() {
        this.usersService.getData().subscribe(data => this.users = data);
    }

    private deleteUser(id) {
        this.usersService.delete(id);
        this.router.navigate(['/messages']);
    }

    private checkOnline(values) {
        let countOfOnline = 0;
        if(values) {
            for(let value of values)
                if(value.online) countOfOnline++;
        }
        return countOfOnline;        
    }
}