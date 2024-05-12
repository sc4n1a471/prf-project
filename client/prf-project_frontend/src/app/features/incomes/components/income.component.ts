import { Component, effect } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatTabsModule } from '@angular/material/tabs'
import { MatSelectModule } from '@angular/material/select'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import {
	FormBuilder,
	UntypedFormControl,
	UntypedFormGroup,
	Validators,
} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { IncomeService } from '../services/income.service'
import { Income } from '../../../shared/model/Income'
import { MatDialog } from '@angular/material/dialog'
import { NewIncomeDialogComponent } from './new-income-dialog/new-income-dialog.component'
import { MatButton, MatButtonModule } from '@angular/material/button'

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
		MatButtonModule
	],
	templateUrl: './income.component.html',
	styleUrl: './income.component.scss',
})
export class IncomeComponent {
	incomes: Income[] = []

	constructor(
		private incomeService: IncomeService,
		private newIncomeDialog: MatDialog
	) {
		effect(() => {
			this.incomes = this.incomeService.incomes()
			console.log('this.incomes got updated in income.component.ts')
		})
	}

	editPanelOpenState = false
	isEditing = false
	isDeleting = false

	ngOnInit() {
		this.incomeService.getIncomes()
	}

	onEditStart() {
		this.editPanelOpenState = true
		this.isEditing = true
	}
	onEditFinish() {
		this.editPanelOpenState = false
		this.onCollapse()
	}
	onCollapse() {
		this.isEditing = false
		this.isDeleting = false
	}

	openNewIncomeDialog() {
		this.newIncomeDialog.open(NewIncomeDialogComponent)
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
