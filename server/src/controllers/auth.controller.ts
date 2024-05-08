import { Request, Response, NextFunction } from "express"
import { User } from "../model/User"

const passport = require("../passport/passport")

async function login(req: Request, res: Response, next: NextFunction) {
	passport.authenticate("local", (error: string | null, user: typeof User) => {
		console.log(user)
		if (error) {
			console.log(error)
			res.status(500).send(error)
		} else {
			if (!user) {
				res.status(400).send("User not found.")
			} else {
				req.login(user, async (err: string | null) => {
					if (err) {
						console.log(err)
						res.status(500).send("Internal server error.")
					} else {
						const isAdmin = await checkAdmin(req, res)
						res.status(200).send({
							userId: user,
							isAdmin: isAdmin
						})
					}
				})
			}
		}
	})(req, res, next)
}

async function logout(req: Request, res: Response) {
	if (req.isAuthenticated()) {
		req.logout((error) => {
			if (error) {
				console.log(error)
				res.status(500).send("Internal server error.")
			}
			res.status(200).send("Successfully logged out.")
		})
	} else {
		res.status(401).send("User is not logged in.")
	}
}

async function checkAuth(req: Request, res: Response) {
	if (req.isAuthenticated()) {
		console.log("User is authenticated.");
		const isAdmin = await checkAdmin(req, res)
		res.status(200).send({isAuthenticated: true, isAdmin: isAdmin, userId: req.user})
	} else {
		console.log("User is not authenticated.");
		res.status(401).send({isAuthenticated: false, isAdmin: false, userId: ""})
	}
}

async function checkAdminWrapper(req: Request, res: Response) {
    const isAdmin = await checkAdmin(req, res)
    res.status(200).send(isAdmin)
}

async function checkAdmin(req: Request, res: Response): Promise<boolean> {
	const query = User.findById(req.user)
	return query
		.then((data) => {
			if (data) {
				return data.isAdmin
			} else {
				console.error("User not found.")
				return false
			}
		})
		.catch((error) => {
			console.log(error)
			return false
		})
}

export const controller = {
	login,
	logout,
	checkAuth,
	checkAdmin,
    checkAdminWrapper
}
