import { Component } from '@angular/core'
import { MatCard } from '@angular/material/card'
import { AuthService } from '../../services/auth.service'

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [MatCard],
	templateUrl: './main.component.html',
	styleUrl: './main.component.scss',
})
export class MainComponent {}