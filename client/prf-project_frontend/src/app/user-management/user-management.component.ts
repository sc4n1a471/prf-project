import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { User } from '../shared/model/User';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user-management',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './user-management.component.html',
	styleUrl: './user-management.component.scss',
})
export class UserManagementComponent {
	users: User[] = []

	constructor(
		private userService: UserService,
		private authService: AuthService,
		private router: Router
	) {
		effect(() => {
			this.users = this.userService.users()
			console.log("this.users got updated in user-management");
		})
	}

	ngOnInit() {
		this.userService.getAllUsers()
	}
}
