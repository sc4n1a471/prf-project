import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { catchError, map, of } from 'rxjs'

export const authGuard: CanActivateFn = (route, state) => {
	const r = inject(Router)
	const authService = inject(AuthService)

	return authService.checkPermissions().pipe(
		map((object: any) => {
			if (!object.isAuthenticated) {
				// authService.isAuthenticated.set(false)
				// authService.isAdmin.set(false)
				r.navigateByUrl('/login')
				return false
			} else {
				// authService.isAuthenticated.set(true)
				if (route.data['roles'][0] == 'admin') {
					console.log('Site requests admin access')
					if (object.isAdmin) {
						console.log('User is admin')
						// authService.isAdmin.set(true)
						return true
					} else {
						console.log('User is not admin')
						r.navigateByUrl('/signup')
						// authService.isAdmin.set(false)
						return false
					}
				} else {
					console.log('User is authenticated')
					return true
				}
			}
		}),

		catchError((error) => {
			console.log(error)
			r.navigateByUrl('/login')
			authService.isAdmin.set(false)
			authService.isAuthenticated.set(false)
			return of(false)
		})
	)
}
