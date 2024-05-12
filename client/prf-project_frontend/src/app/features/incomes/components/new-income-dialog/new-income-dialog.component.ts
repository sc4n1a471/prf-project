import { CommonModule } from '@angular/common'
import { Component, effect } from '@angular/core'
import {
	ReactiveFormsModule,
	UntypedFormControl,
	UntypedFormGroup,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import {
	MatOptionModule,
	MatNativeDateModule,
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
} from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import {
	MatDialogModule,
	MatDialogContent,
	MatDialogActions,
	MatDialogRef,
} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { UserService } from '../../../users/services/user.service'
import { ServiceService } from '../../../services/services/service.service'
import { Service } from '../../../../shared/model/Service'
import { User } from '../../../../shared/model/User'
import { IncomeService } from '../../services/income.service'
import { IncomeCreate } from '../../../../shared/model/Income'
import { MomentDateAdapter } from '@angular/material-moment-adapter'

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
}

@Component({
	selector: 'app-new-income-dialog',
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
		MatNativeDateModule,
	],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{
			provide: MAT_DATE_FORMATS,
			useValue: MY_FORMATS,
		},
	],
	templateUrl: './new-income-dialog.component.html',
	styleUrl: './new-income-dialog.component.scss',
})
export class NewIncomeDialogComponent {
	incomeTypes = {
		service: 'service',
		activePass: 'activePass',
	}
	incomeType = this.incomeTypes.service
	isNewIncomeServicesLoading = false
	isNewIncomeUsersLoading = false

	services: Service[] = []
	users: User[] = []

	newIncomeForm = new UntypedFormGroup({
		service_id: new UntypedFormControl(''),
		// pass_in_use_id: new UntypedFormControl(''),
		amount: new UntypedFormControl(''),
		payer_ids: new UntypedFormControl(''),
		comment: new UntypedFormControl(''),
		paid: new UntypedFormControl(false),
		created_at: new UntypedFormControl(new Date()),
	})

	constructor(
		private userService: UserService,
		private serviceService: ServiceService,
		private incomeService: IncomeService,
		private dialogRef: MatDialogRef<NewIncomeDialogComponent>
	) {
		effect(() => {
			this.services = this.serviceService.services()
			console.log(
				'this.services got updated in new-income-dialog.component.ts'
			)
		})

		effect(() => {
			this.users = this.userService.users()
			console.log(
				'this.users got updated in new-income-dialog.component.ts'
			)
		})
	}

	ngOnInit() {
		this.serviceService.getServices()
		this.userService.getUsers()
	}

	async createIncome() {
		const serviceIds = [this.newIncomeForm.value.service_id]
		const payerIds = this.newIncomeForm.value.payer_ids
		const comment = this.newIncomeForm.value.comment
		const amount = this.newIncomeForm.value.amount
		const paid = this.newIncomeForm.value.paid
		const createdAt = this.newIncomeForm.value.created_at

		const newIncomeObject: IncomeCreate = {
			serviceIds,
			payerIds,
			comment,
			amount,
			paid,
			createdAt
		}

		const success = await this.incomeService.createIncome(newIncomeObject)
		if (success) {
			this.dialogRef.close()
		}
	}
}
