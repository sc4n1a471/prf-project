import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {
	FormBuilder,
	UntypedFormControl,
	UntypedFormGroup,
	Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PassService } from '../services/pass.service';
import { Pass } from '../../../shared/model/Pass';
import { ActivePass } from '../../../shared/model/ActivePass';

@Component({
	selector: 'app-pass',
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
	],
	templateUrl: './pass.component.html',
	styleUrl: './pass.component.scss',
})
export class PassComponent {
	passes: Pass[] = [];
	activePasses: ActivePass[] = [];

	constructor(private passService: PassService, private fb: FormBuilder) {
		effect(() => {
			this.passes = this.passService.passes();
			console.log('this.passes got updated in pass.component.ts');
		});
		effect(() => {
			this.activePasses = this.passService.activePasses();
			console.log('this.activePasses got updated in pass.component.ts');
		});
	}

	editPanelOpenState = false;
	isEditing = false;
	isDeleting = false;

	tabLabels = {
		passes: 'Bérletek',
		activePasses: 'Aktív bérletek',
	};

	ngOnInit() {
		this.passService.getPasses();
	}

	tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
		switch (tabChangeEvent.tab.textLabel) {
			case this.tabLabels.passes:
				this.passService.getPasses();
				break;
			case this.tabLabels.activePasses:
				this.passService.getActivePasses();
				break;
			default:
				console.log('tabChanged default:');
				console.log(tabChangeEvent);
		}
	};

	onEditStart() {
		this.editPanelOpenState = true;
		this.isEditing = true;
	}
	onEditFinish() {
		this.editPanelOpenState = false;
		this.onCollapse();
	}
	onCollapse() {
		this.isEditing = false;
		this.isDeleting = false;
	}
}