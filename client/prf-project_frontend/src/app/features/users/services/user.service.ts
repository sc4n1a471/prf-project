import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { endpoints } from '../../../../environments/endpoints';
import { User } from '../../../shared/model/User';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	users = signal<User[]>([]);

	constructor(private http: HttpClient) {}

	getUsers() {
		this.http
			.get<User[]>(endpoints.getAllUsers, {
				withCredentials: true,
			})
			.subscribe({
				next: (data) => {					
					this.users.set(data);
				},
				error: (err) => {
					console.log(err);
				},
			});
	}
}
