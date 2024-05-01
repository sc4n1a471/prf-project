import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { User } from '../model/User';
import { endpoints } from '../../../environments/endpoints';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	users = signal<User[]>([])

	constructor(private http: HttpClient) {}

	getAllUsers() {
		this.http.get<User[]>(endpoints.getAllUsers, {
			withCredentials: true,
		}).subscribe({
			next: (data) => {
				this.users.set(data)				
			},
			error: (err) => {
				console.log(err)
			},
		})
	}
}
