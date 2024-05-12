import { general } from "./general";

const URL = (function() {
	if (general.production) {
		return 'https://prf.sc4n1a.hu/backend/prf/';
	} else if (general.staging){
		return 'https://prf.sc4n1a.hu/backend/prf/';
	} else if (general.dev) {
		return 'https://prf.sc4n1a.hu/backend/prf/';
	} else {
		return 'http://localhost:5005/prf/';
	}
})()

export const endpoints = {
	// AUTH
	login: URL + 'login',
	register: URL + 'register',
	logout: URL + 'logout',
	checkAuth: URL + 'checkAuth',
	checkAdmin: URL + 'checkAdmin',

	// USERS
	getAllUsers: URL + 'users',
	getUser: URL + 'users/',
	createUser: URL + 'users',

	// SERVICES
	getServices: URL + 'services',
	getService: URL + 'services/',
	createService: URL + 'services',
	updateService: URL + 'services/',
	deleteService: URL + 'services/',

	// PASSES
	getPasses: URL + 'passes',
	createPass: URL + 'passes/',

	// ACTIVE PASSES
	getActivePasses: URL + 'passes-in-use',
	createActivePass: URL + 'passes-in-use',

	// INCOMES
	getIncomes: URL + 'incomes',
	createIncome: URL + 'incomes/multiple-users',
	updateIncome: URL + 'incomes/',
	deleteIncome: URL + 'incomes/',
}
