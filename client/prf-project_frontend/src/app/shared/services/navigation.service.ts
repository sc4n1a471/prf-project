import { Injectable, signal } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
	providedIn: 'root',
})
export class NavigationService {
	openedPage = signal('')

	constructor(private router: Router) {}

	pageChanged(newPage: string) {
		this.openedPage.set(newPage)
	}

	// Navigates to /main for now
	navigateToData() {
		this.router.navigate(['/main'])
	}
}
