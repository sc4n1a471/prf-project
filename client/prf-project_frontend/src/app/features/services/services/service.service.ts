import { HttpClient } from '@angular/common/http'
import { Injectable, signal } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { endpoints } from '../../../../environments/endpoints'
import { Service, ServiceCreate } from '../../../shared/model/Service'

@Injectable({
	providedIn: 'root',
})
export class ServiceService {
	services = signal<Service[]>([])

	constructor(private http: HttpClient) {}

	getServices() {
		this.http
			.get<Service[]>(endpoints.getServices, {
				withCredentials: true,
			})
			.subscribe({
				next: (data) => {
					this.services.set(data)
				},
				error: (err) => {
					console.error(err)
				},
			})
	}

	async createService(service: ServiceCreate) {
		try {
			const response: Service | string = await lastValueFrom(
				this.http.post<Service>(endpoints.createService, service, {
					withCredentials: true,
				})
			)

			console.log(response)
			if (typeof response == 'object') {
				this.services.set([...this.services(), response])
				return true
			} else {
				console.error(response)
				return false
			}
		} catch (error) {
			console.error(error)
			return false
		}
	}
}
