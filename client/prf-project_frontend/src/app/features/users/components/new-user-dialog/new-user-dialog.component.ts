import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
	ReactiveFormsModule,
	UntypedFormControl,
	UntypedFormGroup,
	Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import {
	MatDialogActions,
	MatDialogContent,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { UserCreate } from '../../../../shared/model/User'
import { AuthService } from '../../../../shared/services/auth.service'
import { UserService } from '../../services/user.service'

@Component({
	selector: 'app-new-user-dialog',
	standalone: true,
	imports: [
		CommonModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
		MatCardModule,
		MatButtonModule,
		MatCheckboxModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatDialogContent,
		MatDialogActions,
	],
	templateUrl: './new-user-dialog.component.html',
	styleUrl: './new-user-dialog.component.scss',
})
export class NewUserDialogComponent {
	userId = ''

	newUserForm = new UntypedFormGroup({
		name: new UntypedFormControl('', Validators.required),
		email: new UntypedFormControl('', [Validators.required]),
		is_admin: new UntypedFormControl(false),
	})

	constructor(
		private userService: UserService,
		private authService: AuthService,
		public dialogRef: MatDialogRef<NewUserDialogComponent>
	) {
		this.userId = this.authService.userId()
	}

	async createUser() {
		console.log(this.newUserForm.value)
		console.log('User ID: ', this.userId)
		const newUser: UserCreate = {
			name: this.newUserForm.value.name,
			email: this.newUserForm.value.email,
			isAdmin: this.newUserForm.value.is_admin,
			ownerId: this.userId,
			password: '123456789A',
		}
		const success = await this.userService.createUser(newUser)
		if (success) {
			this.dialogRef.close()
		}
	}
}
