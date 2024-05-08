import { CommonModule } from '@angular/common'
import { Component, effect } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatSelectModule } from '@angular/material/select'
import { MatTabsModule } from '@angular/material/tabs'
import { Router } from '@angular/router'
import { User } from '../../../shared/model/User'
import { AuthService } from '../../../shared/services/auth.service'
import { UserService } from '../services/user.service'
import { NewUserDialogComponent } from './new-user-dialog/new-user-dialog.component'

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
		MatButtonModule,
		MatDialogModule,
	],
	templateUrl: './user.component.html',
	styleUrl: './user.component.scss',
})
export class UserComponent {
	users: User[] = []

	editPanelOpenState = false
	isEditing = false
	isDeleting = false

	constructor(
		private userService: UserService,
		private authService: AuthService,
		private router: Router,
		private newUserDialog: MatDialog
	) {
		effect(() => {
			this.users = this.userService.users()
			console.log('this.users got updated in user-management')
		})
	}

	ngOnInit() {
		this.userService.getUsers()
	}

	onCollapse() {
		this.isEditing = false
		this.isDeleting = false
	}

	openNewUserDialog() {
		this.newUserDialog.open(NewUserDialogComponent)
	}
}
