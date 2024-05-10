import { Component, effect } from '@angular/core';
import { Service } from '../../../shared/model/Service';
import { ServiceService } from '../services/service.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSelectModule } from "@angular/material/select";
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from "@angular/material/input";
import { MatDialog } from '@angular/material/dialog';
import { NewServiceDialogComponent } from './new-service-dialog/new-service-dialog.component';
import { MatButtonModule } from '@angular/material/button';


@Component({
	selector: 'app-service',
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
	templateUrl: './service.component.html',
	styleUrl: './service.component.scss',
})
export class ServiceComponent {
	services: Service[] = []

	constructor(
		private serviceService: ServiceService,
		private fb:FormBuilder,
		private newServiceDialog: MatDialog
	) {
		effect(() => {
			this.services = this.serviceService.services()
			console.log("this.services got updated in service.component.ts");
		})
	}

    editPanelOpenState = false
	isEditing = false
    isDeleting = false

	ngOnInit() {
		this.serviceService.getServices()
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
        // this.editedServiceDynamicPrices.reset()
        // this.prices.clear()
    }

	openNewServiceDialog() {
		this.newServiceDialog.open(NewServiceDialogComponent)
	}
}
