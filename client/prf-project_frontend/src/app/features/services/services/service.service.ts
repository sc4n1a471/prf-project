import { Injectable, signal } from '@angular/core';
import { Service } from '../../../shared/model/Service';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../../../../environments/endpoints';

@Injectable({
	providedIn: 'root',
})
export class ServiceService {
	services = signal<Service[]>([])

	constructor(private http: HttpClient) {}

	getServices() {
		this.http.get<Service[]>(endpoints.getServices, {
			withCredentials: true
		}).subscribe({
			next: (data) => {
				this.services.set(data)
			},
			error: (err) => {
				console.error(err)
			}
		})
	}
}
