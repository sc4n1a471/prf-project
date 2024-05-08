export const endpoints = {
	// AUTH
	login: 'http://localhost:5005/prf/login',
	register: 'http://localhost:5005/prf/register',
	logout: 'http://localhost:5005/prf/logout',
	checkAuth: 'http://localhost:5005/prf/checkAuth',
	checkAdmin: 'http://localhost:5005/prf/checkAdmin',

	// USERS
	getAllUsers: 'http://localhost:5005/prf/users',
	getUser: 'http://localhost:5005/prf/users/',
	createUser: 'http://localhost:5005/prf/users',

	// SERVICES
	getServices: 'http://localhost:5005/prf/services',
	getService: 'http://localhost:5005/prf/services/',
	createService: 'http://localhost:5005/prf/services',
	updateService: 'http://localhost:5005/prf/services/',
	deleteService: 'http://localhost:5005/prf/services/',

	// PASSES
	getPasses: 'http://localhost:5005/prf/passes',

	// ACTIVE PASSES
	getActivePasses: 'http://localhost:5005/prf/passes-in-use',

	// INCOMES
	getIncomes: 'http://localhost:5005/prf/incomes',
}
