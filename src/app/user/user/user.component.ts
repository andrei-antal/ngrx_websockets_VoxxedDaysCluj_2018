import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { ChangeUserName, ChangeUserAvatar } from '../user.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userName: string;
  userAvatar: string;
  avatars: string[];
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.select('user')
      .subscribe(user => {
        this.userName = user.name;
        this.userAvatar = user.avatar;
        this.avatars = user.avatars;
      });
  }

  saveName() {
    this.store.dispatch(new ChangeUserName(this.userName));
  }

  changeAvatar(newAvatar) {
    this.store.dispatch(new ChangeUserAvatar(newAvatar));
  }
}
