import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { NavComponent } from './shared/views/nav/nav.component'
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIcon } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { AuthService } from './shared/services/auth.service'
import { map, catchError, of } from 'rxjs'

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		LoginComponent,
		SignupComponent,
		MatSidenavModule,
		NavComponent,
		MatToolbarModule,
		MatIcon,
		MatButtonModule,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'prf-project_frontend'
	sub: any

	toggleSidenav(sidenav: MatSidenav) {
		sidenav.toggle()
	}

	onCloseSidenav(event: any, sidenav: MatSidenav) {
		if (event === true) {
			sidenav.close()
		}
	}

	constructor(
		private authService: AuthService
	) {}

	ngOnInit() {
		// This is required for now, but will need to figure out a way to set isAdmin and isAuthenticated in the AuthService
		// on refresh
		this.sub = this.authService.checkPermissions().subscribe({
			next: (object:any) => {
				if (!object.isAuthenticated) {
					this.authService.isAuthenticated.set(false)
					this.authService.isAdmin.set(false)
					this.authService.userId.set('')
				} else {
					this.authService.userId.set(object.userId)
					this.authService.isAuthenticated.set(true)
					if (object.isAdmin) {
						console.log('User is admin')
						this.authService.isAdmin.set(true)
					} else {
						console.log('User is not admin')
						this.authService.isAdmin.set(false)
					}
				}
		
				catchError((error) => {
					console.log(error)
					this.authService.isAdmin.set(false)
					this.authService.isAuthenticated.set(false)
					this.authService.userId.set('')
					return of(false)
				})
			},
			error: (err) => {
				console.log(err)
			},
		})
	}

	ngOnDestroy() {
		this.sub.unsubscribe()
	}
}
