import { CommonModule } from '@angular/common'
import { Component, effect } from '@angular/core'
import {
	ReactiveFormsModule,
	UntypedFormControl,
	UntypedFormGroup
} from '@angular/forms'
import { MomentDateAdapter } from '@angular/material-moment-adapter'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialog } from '@angular/material/dialog'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatSelectModule } from '@angular/material/select'
import { MatTabsModule } from '@angular/material/tabs'
import { Income } from '../../../shared/model/Income'
import { IncomeService } from '../services/income.service'
import { NewIncomeDialogComponent } from './new-income-dialog/new-income-dialog.component'

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
	selector: 'app-income',
	standalone: true,
	imports: [
		MatTabsModule,
		MatExpansionModule,
		CommonModule,
		MatListModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
		MatCardModule,
		MatButtonModule,
		MatCheckboxModule,
		ReactiveFormsModule,
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
	templateUrl: './income.component.html',
	styleUrl: './income.component.scss',
})
export class IncomeComponent {
	incomes: Income[] = []

	editPanelOpenState = false
	isEditing = false
	isDeleting = false

	editedIncome: Income | undefined
    editedIncomeForm = new UntypedFormGroup({
        isPaid: new UntypedFormControl(''),
        comment: new UntypedFormControl(''),
        createdAt: new UntypedFormControl(''),
    })

	constructor(
		private incomeService: IncomeService,
		private newIncomeDialog: MatDialog
	) {
		effect(() => {
			this.incomes = this.incomeService.incomes()
			console.log('this.incomes got updated in income.component.ts')
		})
	}

	ngOnInit() {
		this.incomeService.getIncomes()
	}

	onCollapse() {
		this.isEditing = false
		this.isDeleting = false
	}

	openNewIncomeDialog() {
		this.newIncomeDialog.open(NewIncomeDialogComponent)
	}

	// EDIT
	onEditStart() {
		this.editPanelOpenState = true
		this.isEditing = true
	}
	onEditFinish() {
		this.editPanelOpenState = false
		this.onCollapse()
		this.editedIncomeForm.reset()
	}
	onEditIncome(selectedIncome: Income) {
        if (!this.isEditing) {
            if (selectedIncome !== undefined) {
                this.editedIncome = selectedIncome
                this.editedIncomeForm.patchValue(selectedIncome)
            }
            this.onEditStart()
        }
    }

	async updateIncome() {
		if (this.editedIncome !== undefined) {
			const updatedIncome = {
				...this.editedIncome,
				...this.editedIncomeForm.value,
			}
			console.log(updatedIncome);
			const success = await this.incomeService.updateIncome(updatedIncome)
			if (success) {
				this.onEditFinish()
			}
		}
	
	}

	// DELETE
	onDeleteStart() {
        this.editPanelOpenState = true
        this.isDeleting = true
    }
    onDeleteFinish() {
        this.editPanelOpenState = false
        this.isDeleting = false
    }

	async deleteIncome(incomeId: string) {
		const success = await this.incomeService.deleteIncome(incomeId)
		if (success) {
			this.onDeleteFinish()
		}
	}
}
