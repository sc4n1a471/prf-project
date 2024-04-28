import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const r = inject(Router);

    return inject(AuthService)
        .checkPermissions()
        .pipe(
            map((object: any) => {
				console.log(object);
				
                if (!object.isAuthenticated) {
                    // navigation
                    r.navigateByUrl('/login');
                    return false;
                } else {
					if (route.data['roles'][0] == 'admin') {
						console.log('Site requests admin access');
						if (object.isAdmin) {
							console.log('User is admin');
							return true

						} else {
							console.log('User is not admin');
							r.navigateByUrl('/signup');
							return false;
						}
					} else {
						console.log('User is authenticated');
						return true;
					}
                }
            }),

            catchError((error) => {
                console.log(error);
                r.navigateByUrl('/login');
                return of(false);
            })
        );
};
