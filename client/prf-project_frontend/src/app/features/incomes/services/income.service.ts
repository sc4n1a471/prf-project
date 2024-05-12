import { HttpClient } from '@angular/common/http'
import { Injectable, signal } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { endpoints } from '../../../../environments/endpoints'
import { Income, IncomeCreate } from '../../../shared/model/Income'

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
					console.log(data)

					this.incomes.set(data)
				},
				error: (err) => {
					console.error(err)
				},
			})
	}

	async createIncome(newIncomeObject: IncomeCreate) {
		try {
			const response: Object | string = await lastValueFrom(
				this.http.post(endpoints.createIncome, newIncomeObject, {
					withCredentials: true,
				})
			)
			console.log('response', response)

			this.getIncomes()
			return true
		} catch (error) {
			console.error(error)
			return false
		}
	}

	async updateIncome(updatedIncome: Income) {
		try {
			const response: Object | string = await lastValueFrom(
				this.http.patch(
					endpoints.updateIncome + updatedIncome._id,
					updatedIncome,
					{
						withCredentials: true,
					}
				)
			)
			console.log('response', response)

			this.getIncomes()
			return true
		} catch (error) {
			console.error(error)
			return false
		}
	}

	async deleteIncome(incomeId: string) {
		try {
			const response: Object | string = await lastValueFrom(
				this.http.delete(endpoints.deleteIncome + incomeId, {
					withCredentials: true,
				})
			)
			console.log('response', response)

			this.getIncomes()
			return true
		} catch (error) {
			console.error(error)
			return false
		}
	}
}
