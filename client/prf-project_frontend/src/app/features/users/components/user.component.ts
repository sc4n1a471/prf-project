import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../shared/model/User';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSelectModule } from "@angular/material/select";
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from "@angular/material/input";

@Component({
	selector: 'app-user',
	standalone: true,
	imports: [
		MatTabsModule,
		MatExpansionModule,
		CommonModule,
		MatListModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
		MatCardModule,
		
	],
	templateUrl: './user.component.html',
	styleUrl: './user.component.scss',
})
export class UserComponent {
	users: User[] = [];

	editPanelOpenState = false
	isEditing = false
    isDeleting = false

	constructor(
		private userService: UserService,
		private authService: AuthService,
		private router: Router
	) {
		effect(() => {
			this.users = this.userService.users();
			console.log('this.users got updated in user-management');
		});
	}

	ngOnInit() {
		this.userService.getUsers();
	}

	onCollapse() {
        this.isEditing = false
        this.isDeleting = false
    }
}
