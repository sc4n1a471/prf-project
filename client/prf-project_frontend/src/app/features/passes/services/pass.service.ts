import { Injectable, signal } from '@angular/core';
import { Pass, PassCreate } from '../../../shared/model/Pass';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../../../../environments/endpoints';
import { ActivePass, ActivePassCreate } from '../../../shared/model/ActivePass';
import { lastValueFrom } from 'rxjs';

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
				console.log(data);
				
				this.activePasses.set(data)
			},
			error: (err) => {
				console.error(err)
			}
		})
	}

	async createPass(newPass: PassCreate) {
		try {
			const response: Pass | string = await lastValueFrom(
				this.http.post<Pass>(endpoints.createPass, newPass, {
					withCredentials: true
				})
			)

			console.log(response);
			if (typeof response == 'object') {
				this.passes.set([...this.passes(), response])
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

	async createActivePass(newActivePass: ActivePassCreate) {
		try {
			const response: ActivePass | string = await lastValueFrom(
				this.http.post<ActivePass>(endpoints.createActivePass, newActivePass, {
					withCredentials: true
				})
			)

			console.log(response);
			if (typeof response == 'object') {
				this.getActivePasses()
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
