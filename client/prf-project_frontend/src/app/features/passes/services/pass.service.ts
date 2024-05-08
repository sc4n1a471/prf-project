import { Injectable, signal } from '@angular/core';
import { Pass } from '../../../shared/model/Pass';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../../../../environments/endpoints';
import { ActivePass } from '../../../shared/model/ActivePass';

@Injectable({
	providedIn: 'root',
})
export class PassService {
	passes = signal<Pass[]>([])
	activePasses = signal<ActivePass[]>([])

	constructor(private http: HttpClient) {}

	getPasses() {
		this.http.get<Pass[]>(endpoints.getPasses, {
			withCredentials: true
		}).subscribe({
			next: (data) => {
				this.passes.set(data)
			},
			error: (err) => {
				console.error(err)
			}
		})
	}

	getActivePasses() {
		this.http.get<ActivePass[]>(endpoints.getActivePasses, {
			withCredentials: true
		}).subscribe({
			next: (data) => {
				this.activePasses.set(data)
			},
			error: (err) => {
				console.error(err)
			}
		})
	}
}
