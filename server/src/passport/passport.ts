import { Strategy } from "passport-local"
import { User } from "../model/User"

const passport = require("passport")

passport.serializeUser((user: Express.User, done: any) => {
	done(null, user)
})

passport.deserializeUser((user: Express.User, done: any) => {
	done(null, user)
})

passport.use(
	"local",
	new Strategy((username, password, done) => {
		const query = User.findOne({ email: username, isActive: true })
		query
			.then((user) => {
				if (user) {
					user.comparePassword(password, (error, _) => {
						if (error) {
							done("Incorrect email or password.")
						} else {
							done(null, user._id)
						}
					})
				} else {
					done(null, undefined)
				}
			})
			.catch((error) => {
				done(error)
			})
	})
)

module.exports = passport
