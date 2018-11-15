import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userName = 'My user';
  public userAvatar = 'face';
  public readonly avatars = ['face', 'casino', 'school'];
  constructor() { }
}
