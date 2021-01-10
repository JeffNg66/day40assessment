import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  users: User[] = [];
  // content?: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      user => {
        this.users = user;
        console.info('thisuser', this.users)
      },
      // err => {
      //   this.users = JSON.parse(err.error).message;
      // }
    );
  }
}