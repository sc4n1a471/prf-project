import { DynamicPrice } from './DynamicPrice'

export interface Service {
	_id: string
	name: string
	comment: string
	price: number
	createdAt: Date
	updatedAt: Date
	isActive: boolean
	userId: string
	prevServiceId: string
	dynamicPrices: DynamicPrice[]
}

export interface ServiceCreate {
	name: string
	comment: string
	price: number
	dynamicPrices?: DynamicPrice[]
}
