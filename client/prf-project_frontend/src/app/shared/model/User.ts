import { Pass } from './Pass'
import { ActivePass } from './ActivePass'
import { Service } from './Service'

export interface User {
	createdAt: Date
	email: string
	isActive: boolean
	isAdmin: boolean
	name: string
	_id: string
	ownerId: string
	updatedAt: Date
	services?: Service[]
	passes?: Pass[]
	passesInUse: ActivePass[]
	// myUsers: User[];
}

export interface UserCreate {
	name: string
	email: string
	isAdmin: boolean
	ownerId: string
	password: string
}

export interface UserLoginResponse {
	userId: string
	isAdmin: boolean
}
