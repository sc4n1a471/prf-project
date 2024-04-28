import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { endpoints } from '../../../environments/endpoints';
import { map, of, switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {}

	login(email: string, password: string) {
		const body = {
			username: email,
			password: password,
		};

		return this.http.post(endpoints.login, body, {
			withCredentials: true,
		});
	}

	register(user: User) {
		const body = new URLSearchParams();
		body.set('email', user.email);
		body.set('name', user.name);

		return this.http.post(endpoints.register, body);
	}

	logout() {
		return this.http.post(
			endpoints.logout,
			{},
			{ withCredentials: true, responseType: 'text' }
		);
	}

	checkPermissions() {
		console.log('Checking auth');

		return this.http.get<boolean>(endpoints.checkAuth, {
			withCredentials: true,
		});
	}

	checkAdmin() {
		console.log('Checking admin');
		return this.http.get<boolean>(endpoints.checkAdmin, {
			withCredentials: true,
		});
	}
}
