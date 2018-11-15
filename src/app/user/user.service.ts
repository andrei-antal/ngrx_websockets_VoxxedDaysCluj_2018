import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private name: string;
  private avatar: string;
  public readonly avatars = ['face', 'casino', 'school'];
  constructor() {

  }

  get userName() {
    if (!this.name) {
      const storedName = localStorage.getItem('userName');
      return storedName || 'My user';
    }
    return this.name;
  }

  set userName(newUserName) {
    localStorage.setItem('userName', newUserName);
  }

  get userAvatar() {
    if (!this.avatar) {
      const storedAvatar = localStorage.getItem('userAvatar');
      return storedAvatar || 'face';
    }
    return this.avatar;
  }

  set userAvatar(newUserAvatar) {
    localStorage.setItem('userAvatar', newUserAvatar);
  }
}
