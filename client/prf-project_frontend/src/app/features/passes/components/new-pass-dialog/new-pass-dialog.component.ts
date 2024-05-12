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
import { MatOptionModule } from '@angular/material/core'
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
import { PassCreate } from '../../../../shared/model/Pass'
import { Service } from '../../../../shared/model/Service'
import { ServiceService } from '../../../services/services/service.service'
import { PassService } from '../../services/pass.service'

@Component({
	selector: 'app-new-pass-dialog',
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
	],
	templateUrl: './new-pass-dialog.component.html',
	styleUrl: './new-pass-dialog.component.scss',
})
export class NewPassDialogComponent {
	services: Service[] = []
	isNewPassServicesLoading = false
	timeIntervals = [1, 2, 3, 4, 5, 6]
	timeTypes = ['week', 'month']

	newPassForm = new UntypedFormGroup({
		name: new UntypedFormControl('', Validators.required),
		price: new UntypedFormControl('', Validators.required),
		service_ids: new UntypedFormControl('', Validators.required),
		occasion_limit: new UntypedFormControl(0),
		comment: new UntypedFormControl(''),
	})
	newPassFormTime = new UntypedFormGroup({
		timeInterval: new UntypedFormControl(''),
		timeType: new UntypedFormControl(''),
	})

	constructor(
		private serviceService: ServiceService,
		private passService: PassService,
		private dialogRef: MatDialogRef<NewPassDialogComponent>
	) {
		effect(() => {
			this.services = this.serviceService.services()
			console.log(
				'this.services got updated in new-pass-dialog.component.ts'
			)
		})
	}

	ngOnInit() {
		this.serviceService.getServices()
	}

	async createPass() {
		let newPass: PassCreate = {
			name: this.newPassForm.value.name,
			price: this.newPassForm.value.price,
			service_ids: this.newPassForm.value.service_ids,
			occasion_limit: this.newPassForm.value.occasion_limit,
			comment: this.newPassForm.value.comment,
			duration:
				this.newPassFormTime.value.timeInterval +
				' ' +
				this.newPassFormTime.value.timeType,
		}
		console.log(newPass)

		const success = await this.passService.createPass(newPass)
		if (success) {
			this.dialogRef.close()
		}
	}
}
