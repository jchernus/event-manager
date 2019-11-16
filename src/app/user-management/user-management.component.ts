import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
import { User, roles  } from '../user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users : Observable<any[]>;
  roles;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.users = this.usersService.getAllUsersObservable();
    this.roles = roles;
  }
}