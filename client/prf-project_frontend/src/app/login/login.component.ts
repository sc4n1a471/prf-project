import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
	ReactiveFormsModule,
	UntypedFormControl,
	UntypedFormGroup,
	Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCard } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { Router, RouterModule } from '@angular/router'
import { AuthService } from '../shared/services/auth.service'

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
		MatButtonModule,
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

	async login() {
		console.log('Logging in')

		await this.authService.login(
			this.loginForm.get('email')?.value,
			this.loginForm.get('passwd')?.value
		)
	}

	navigate(to: string) {
		this.router.navigateByUrl(to)
	}
}
