import { ActivePass } from './ActivePass'
import { Service } from './Service'

export interface Income {
	_id: string
	isActive: boolean
	amount: number
	comment?: string
	createdAt: Date
	userId: string
	passInUseId?: string
	passInUse?: ActivePass
	serviceId?: string
	service?: Service
	updatedAt: Date
	payerId: string
	name: string
	isPaid: boolean
}

export interface IncomeCreate {
	amount?: number
	comment?: string
	passInUseIds?: string[]
	serviceIds?: string[]
	payerIds: string[]
	name?: string
	paid: boolean
	createdAt?: Date
}
