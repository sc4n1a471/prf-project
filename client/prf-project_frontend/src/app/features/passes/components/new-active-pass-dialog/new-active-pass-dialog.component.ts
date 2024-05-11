import { CommonModule } from '@angular/common'
import { Component, effect } from '@angular/core'
import {
	ReactiveFormsModule,
	UntypedFormControl,
	UntypedFormGroup,
	Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import {
	MatDialogActions,
	MatDialogContent,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { Pass } from '../../../../shared/model/Pass'
import { User } from '../../../../shared/model/User'
import { UserService } from '../../../users/services/user.service'
import { PassService } from '../../services/pass.service'
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core'
import {MomentDateAdapter} from "@angular/material-moment-adapter";

// @ts-ignore
/**
 * See the Moment.js docs for the meaning of these formats:
 * {@link https://momentjs.com/docs/#/displaying/format/}
 */
export const MY_FORMATS = {
    parse: {
        dateInput: 'MM/YYYY',
    },
    display: {
        dateInput: 'YYYY MMMM DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
	selector: 'app-new-active-pass-dialog',
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
		MatOptionModule,
		MatSelectModule,
		MatDatepickerModule,
		MatNativeDateModule
	],
	templateUrl: './new-active-pass-dialog.component.html',
	styleUrl: './new-active-pass-dialog.component.scss',
	providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE]},
        {
            provide: MAT_DATE_FORMATS,
            useValue: MY_FORMATS
        },
    ],
})
export class NewActivePassDialogComponent {
	newActivePassForm = new UntypedFormGroup({
		pass_id: new UntypedFormControl('', Validators.required),
		payer_id: new UntypedFormControl('', Validators.required),
		valid_from: new UntypedFormControl(new Date(), Validators.required),
		valid_until: new UntypedFormControl(''),
	})

	isNewActivePassLoading = false
	passes: Pass[] = []
	users: User[] = []

	constructor(
		private passService: PassService,
		private userService: UserService,
		private dialogRef: MatDialogRef<NewActivePassDialogComponent>
	) {
		effect(() => {
			this.passes = this.passService.passes()
		})

		effect(() => {
			this.users = this.userService.users()
		})
	}

	ngOnInit() {
		this.passService.getPasses()
		this.userService.getUsers()
	}

	async createActivePass() {
		const success = await this.passService.createActivePass(
			this.newActivePassForm.value
		)
		if (success) {
			this.dialogRef.close()
		}
	}

	calculateValidUntil() {
		for (let pass of this.passes) {
			if (pass._id === this.newActivePassForm.get('pass_id')?.value) {
				console.log(pass)
				const durationInterval = Number(pass.duration.split(' ')[0])
				const durationType = pass.duration.split(' ')[1]
				let validFrom = new Date(
					this.newActivePassForm.value.valid_from
				)
				let validUntil = new Date()

				if (pass.duration === ' ') {
					this.newActivePassForm.patchValue({
						valid_until: '',
					})
					return
				}

				if (durationType === 'week') {
					validUntil = new Date(
						validFrom.setDate(
							validFrom.getDate() + durationInterval * 7
						)
					)
				} else if (durationType === 'month') {
					validUntil = new Date(
						validFrom.setMonth(
							validFrom.getMonth() + durationInterval
						)
					)
				}

				this.newActivePassForm.patchValue({
					valid_until: new Date(validUntil.toDateString()),
				})
				console.log(this.newActivePassForm.value)
				break
			}
		}
	}
}
