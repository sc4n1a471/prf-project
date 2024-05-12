import { animate, state, style, transition, trigger } from '@angular/animations'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
	FormArray,
	FormBuilder,
	ReactiveFormsModule,
	UntypedFormControl,
	UntypedFormGroup,
	Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import {
	MatDialogActions,
	MatDialogContent,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { ServiceCreate } from '../../../../shared/model/Service'
import { ServiceService } from '../../services/service.service'

@Component({
	selector: 'app-new-service-dialog',
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
	],
	templateUrl: './new-service-dialog.component.html',
	styleUrl: './new-service-dialog.component.scss',
	animations: [
		trigger('dynamicPriceCardOpen', [
			state(
				'closed',
				style({
					opacity: 0,
				})
			),
			state(
				'open',
				style({
					opacity: 1,
				})
			),
			transition('* => *', animate(150)),
		]),
	],
})
export class NewServiceDialogComponent {
	dynamicPrice: string = 'closed'

	newServiceForm = new UntypedFormGroup({
		name: new UntypedFormControl('', Validators.required),
		price: new UntypedFormControl('', Validators.required),
		comment: new UntypedFormControl(''),
		dynamic_prices: new UntypedFormControl([]),
	})

	newServiceDynamicPrices = this.fb.group({
		prices: this.fb.array([]),
	})

	constructor(
		private serviceService: ServiceService,
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<NewServiceDialogComponent>
	) {}

	async createService() {
		this.newServiceForm.patchValue({
			dynamic_prices: this.newServiceDynamicPrices.value.prices,
		})
		let newService: ServiceCreate = this.newServiceForm.value
		console.log(newService)

		const success = await this.serviceService.createService(newService)

		if (success) {
			this.dialogRef.close()
		}
	}

	// MARK: Dynamic pricing form stuff
	addPrice() {
		const priceForm = this.fb.group({
			attendees: ['', Validators.required],
			price: ['', Validators.required],
		})

		this.prices.push(priceForm)
	}

	deletePrice(priceIndex: number) {
		this.prices.removeAt(priceIndex)
	}

	dynamicPriceTrigger() {
		this.dynamicPrice == 'closed'
			? (this.dynamicPrice = 'open')
			: (this.dynamicPrice = 'closed')
	}

	get prices() {
		return this.newServiceDynamicPrices.controls['prices'] as FormArray
	}
}
