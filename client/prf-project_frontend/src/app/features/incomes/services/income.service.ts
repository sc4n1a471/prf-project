import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { endpoints } from '../../../../environments/endpoints';
import { Income } from '../../../shared/model/Income';

@Injectable({
	providedIn: 'root',
})
export class IncomeService {
	incomes = signal<Income[]>([])

	constructor(private http: HttpClient) {}

	getIncomes() {
		this.http
			.get<Income[]>(endpoints.getIncomes, {
				withCredentials: true,
			})
			.subscribe({
				next: (data) => {
					this.incomes.set(data);
				},
				error: (err) => {
					console.error(err);
				},
			});
	}
}
