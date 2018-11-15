import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userName: string;
  userAvatar: string;
  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userName = this.userService.userName;
    this.userAvatar = this.userService.userAvatar;
  }

  saveName() {
    this.userService.userName = this.userName;
  }

  changeAvatar(newAvatar) {
    this.userAvatar = newAvatar;
    this.userService.userAvatar = newAvatar;
  }
}
