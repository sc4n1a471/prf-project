import { HttpClient } from '@angular/common/http'
import { Injectable, signal } from '@angular/core'
import { User } from '../model/User'
import { endpoints } from '../../../environments/endpoints'
import { map, catchError, of } from 'rxjs'
import { Router } from '@angular/router'

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	isAuthenticated = signal<boolean>(false)
	isAdmin = signal<boolean>(false)

	constructor(
		private http: HttpClient,
		private router: Router
	) {}

	login(email: string, password: string) {
		const body = {
			username: email,
			password: password,
		}

		return this.http.post(endpoints.login, body, {
			withCredentials: true,
		})
	}

	register(user: User) {
		const body = new URLSearchParams()
		body.set('email', user.email)
		body.set('name', user.name)

		return this.http.post(endpoints.register, body)
	}

	logout() {
		this.isAdmin.set(false)
		this.isAuthenticated.set(false)
		return this.http.post(
			endpoints.logout,
			{},
			{ withCredentials: true, responseType: 'text' }
		)
	}

	async setUserStatus() {
		console.log('Setting user status');
		
		this.checkPermissions().pipe(
			map((object: any) => {				
				if (!object.isAuthenticated) {
					this.isAuthenticated.set(false)
					this.isAdmin.set(false)
				} else {
					this.isAuthenticated.set(true)
					if (object.isAdmin) {
						console.log('User is admin')
						this.isAdmin.set(true)
					} else {
						console.log('User is not admin')
						this.router.navigateByUrl('/main')
						this.isAdmin.set(false)
					}
				}
			}),
	
			catchError((error) => {
				console.log(error)
				this.router.navigateByUrl('/login')
				this.isAdmin.set(false)
				this.isAuthenticated.set(false)
				return of(false)
			})
		)
	}

	checkPermissions() {
		console.log('Checking auth')

		return this.http.get<boolean>(endpoints.checkAuth, {
			withCredentials: true,
		})
	}

	checkAdmin() {
		console.log('Checking admin')
		return this.http.get<boolean>(endpoints.checkAdmin, {
			withCredentials: true,
		})
	}
}
