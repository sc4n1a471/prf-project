import { HttpClient } from '@angular/common/http'
import { Injectable, signal } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, lastValueFrom, map, of } from 'rxjs'
import { endpoints } from '../../../environments/endpoints'
import { User, UserLoginResponse } from '../model/User'

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	isAuthenticated = signal<boolean>(false)
	isAdmin = signal<boolean>(false)
	userId = signal<string>('')

	constructor(private http: HttpClient, private router: Router) {}

	async login(email: string, password: string) {
		const body = {
			username: email,
			password: password,
		}

		try {
			const loginRespinse = await lastValueFrom(
				this.http.post<UserLoginResponse>(endpoints.login, body, {
					withCredentials: true,
				})
			)

			if (loginRespinse) {
				console.log('Logged in')
				this.userId.set(loginRespinse.userId)
				this.isAdmin.set(loginRespinse.isAdmin)
				this.isAuthenticated.set(true)

				this.router.navigate(['/main'])
			}
		} catch (error) {
			console.log(error)
		}
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
		this.userId.set('')
		return this.http.post(
			endpoints.logout,
			{},
			{ withCredentials: true, responseType: 'text' }
		)
	}

	setUserStatus() {
		console.log('Setting user status')

		this.checkPermissions().pipe(
			map((object: any) => {
				if (!object.isAuthenticated) {
					this.isAuthenticated.set(false)
					this.isAdmin.set(false)
					this.userId.set('')
				} else {
					this.userId.set(object.userId)
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
				this.userId.set('')
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
