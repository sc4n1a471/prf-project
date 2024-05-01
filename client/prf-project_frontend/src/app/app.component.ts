import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { NavComponent } from './shared/views/nav/nav.component'
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIcon } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		LoginComponent,
		SignupComponent,
		MatSidenavModule,
		NavComponent,
		MatToolbarModule,
		MatIcon,
		MatButtonModule,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'prf-project_frontend'

	toggleSidenav(sidenav: MatSidenav) {
		sidenav.toggle()
	}

	onCloseSidenav(event: any, sidenav: MatSidenav) {
		if (event === true) {
			sidenav.close()
		}
	}
}
