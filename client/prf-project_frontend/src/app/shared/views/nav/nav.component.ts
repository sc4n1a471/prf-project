import { Component, EventEmitter, Output, effect } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { NavigationService } from '../../services/navigation.service'
// import {AuthService} from "../../Services/auth.service";
// import {UserService} from "../../Services/user.service";
// import {NavigationService} from "../../Services/navigation.service";
// import {HelperService} from "../../Services/helper.service";
import { CommonModule } from '@angular/common'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { RouterModule } from '@angular/router'

@Component({
	selector: 'app-nav',
	standalone: true,
	imports: [
		CommonModule,
		MatDividerModule,
		MatListModule,
		MatIconModule,
		RouterModule,
	],
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
	@Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter()
	@Output() loggedOut = new EventEmitter()

	openedPage = ''

	isAuthenticated: boolean = false
	isAdmin: boolean = false

	constructor(
		private authService: AuthService,
		private router: Router,
		// private userService: UserService,
		private navigationService: NavigationService // private helperService: HelperService
	) {
		effect(() => {
			this.isAuthenticated = this.authService.isAuthenticated()
			this.isAdmin = this.authService.isAdmin()
			console.log(
				'this.isAuthenticated got updated in nav',
				this.isAuthenticated
			)
			console.log('this.isAdmin got updated in nav', this.isAdmin)
		})

		effect(() => {
			this.openedPage = this.navigationService.openedPage()
			console.log('this.openedPage got updated in nav')
		})
	}

	close(isLoggingOut = false) {
		if (isLoggingOut) {
			this.logout()
		}
		this.onCloseSidenav.emit(true)
	}

	logout() {
		this.authService.logout().subscribe({
			next: (data) => {
				console.log(data)
				this.router.navigateByUrl('/login')
			},
			error: (err) => {
				console.log(err)
			},
		})
	}
}
