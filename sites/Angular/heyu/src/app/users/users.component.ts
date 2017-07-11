import { Component, OnInit, Output } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user';

import { FilterPipe } from '../filter.pipe';
import { OrderByPipe } from '../order-by.pipe';

@Component({
    selector: 'users',
    templateUrl: 'users.component.html',
    styleUrls: [
        'users.component.css'
    ],
    providers: [UsersService]
})
export class UsersComponent implements OnInit {
    private users: User[];
    private searchTerm: string;
    private sectionTitle:string = 'Contacts';

    constructor(private usersService: UsersService) {}

    ngOnInit(){
        this.loadListOfUsers();
    }

    private loadListOfUsers() {
        this.usersService.getData().subscribe(data => this.users = data);
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