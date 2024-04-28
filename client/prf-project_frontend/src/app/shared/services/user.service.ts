import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { endpoints } from '../../../environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User[]>(endpoints.getAllUsers, {withCredentials: true});
  }
}
