import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
	UntypedFormControl,
	UntypedFormGroup,
	Validators,
	ReactiveFormsModule,
} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { Router, RouterModule } from '@angular/router'
import { AuthService } from '../shared/services/auth.service'
import { MatCard } from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		CommonModule,
		RouterModule,
		MatCard,
		MatFormFieldModule,
		MatIcon,
		MatInputModule,
		MatButtonModule
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	loginForm = new UntypedFormGroup({
		email: new UntypedFormControl('', Validators.required),
		passwd: new UntypedFormControl('', Validators.required),
	})

	constructor(private router: Router, private authService: AuthService) {}

	login() {
		console.log('Logging in')

		this.authService
			.login(
				this.loginForm.get('email')?.value,
				this.loginForm.get('passwd')?.value
			)
			.subscribe({
				next: (data) => {
					if (data) {
						console.log('Logged in')
						// this.authService.setUserStatus(true)
						// this.userService.loadLoggedInUser('login.component / login')
						this.router.navigate(['/user-management'])
					}
				},
				error: (err) => {
					console.log(err)
				},
			})
	}

	navigate(to: string) {
		this.router.navigateByUrl(to)
	}
}
