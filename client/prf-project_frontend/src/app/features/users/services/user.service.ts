import { HttpClient } from '@angular/common/http'
import { Injectable, signal } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { endpoints } from '../../../../environments/endpoints'
import { User, UserCreate } from '../../../shared/model/User'

@Injectable({
	providedIn: 'root',
})
export class UserService {
	users = signal<User[]>([])

	constructor(private http: HttpClient) {}

	getUsers() {
		this.http
			.get<User[]>(endpoints.getAllUsers, {
				withCredentials: true,
			})
			.subscribe({
				next: (data) => {
					this.users.set(data)
				},
				error: (err) => {
					console.log(err)
				},
			})
	}

	async createUser(user: UserCreate) {
		try {
			const response: User | string = await lastValueFrom(
				this.http.post<User>(endpoints.createUser, user, {
					withCredentials: true,
				})
			)
			console.log(response)
			if (typeof response == 'object') {
				this.users.set([...this.users(), response])
				return true
			} else {
				console.error(response)
				return false
			}
		} catch (error) {
			console.error(error)
			return false
		}
	}
}
