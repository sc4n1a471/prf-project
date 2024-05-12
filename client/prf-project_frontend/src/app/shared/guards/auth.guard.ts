import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { catchError, map, of } from 'rxjs'
import { AuthService } from '../services/auth.service'

export const authGuard: CanActivateFn = (route, state) => {
	const r = inject(Router)
	const authService = inject(AuthService)

	return authService.checkPermissions().pipe(
		map((object: any) => {
			if (!object.isAuthenticated) {
				r.navigateByUrl('/login')
				return false
			} else {
				if (route.data['roles'][0] == 'admin') {
					console.log('Site requests admin access')
					if (object.isAdmin) {
						console.log('User is admin')
						return true
					} else {
						console.log('User is not admin')
						r.navigateByUrl('/signup')
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
			authService.userId.set('')
			return of(false)
		})
	)
}
