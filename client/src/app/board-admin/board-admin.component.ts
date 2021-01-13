import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  users: User[] = [];
  content?: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers(): void {
    this.userService.getAdminBoard().subscribe(
      user => {
        this.users = user;
      },
      err => {
        // this.content = JSON.parse(err.error).message;
        this.content = (err.error).message;
      }
    )
  }

  deleteUser(id) {
    if (confirm('Are you sure you want to delete?')) {
      this.userService.deleteUser(id)
        .subscribe(() => {
          this.listUsers();
        })
    }
  }

}