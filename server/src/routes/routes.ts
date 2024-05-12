import { Request, Response, Router } from "express"
import * as passInUse from "../controllers/activePass.controller"
import * as auth from "../controllers/auth.controller"
import * as dp from "../controllers/dp.controller"
import * as income from "../controllers/income.controller"
import * as pass from "../controllers/pass.controller"
import * as service from "../controllers/service.controller"
import * as user from "../controllers/user.controller"

const router = Router()

router.get("/ping", (req: Request, res: Response) => {
	res.status(418).send("Pong!")
})

router.post("/login", auth.controller.login)
router.get("/checkAuth", auth.controller.checkAuth)
router.get("/checkAdmin", auth.controller.checkAdminWrapper)
router.post("/logout", auth.controller.logout)

router.get("/users", user.controller.getUsers)
router.get("/users/:id", user.controller.getUser)
router.post("/users", user.controller.createUser)
router.delete("/users/:id", user.controller.deleteUser)
router.delete("/users/permanently/:id", user.controller.deleteUserPermanently)

router.get("/services", service.controller.getServices)
router.get("/services/:id", service.controller.getService)
router.post("/services", service.controller.createService)
router.patch("/services/:id", service.controller.updateService)
router.delete("/services/:id", service.controller.deleteService)

router.get("/passes", pass.controller.getPasses)
router.get("/passes/:id", pass.controller.getPass)
router.post("/passes", pass.controller.createPass)
router.patch("/passes/:id", pass.controller.updatePass)
router.delete("/passes/:id", pass.controller.deletePass)

router.get("/passes-in-use", passInUse.controller.getPassesInUse)
router.get("/passes-in-use/:id", passInUse.controller.getPassInUse)
router.post("/passes-in-use", passInUse.controller.createPassInUse)
router.delete("/passes-in-use/:id", passInUse.controller.deletePassInUse)

router.get("/incomes", income.controller.getIncomes)
router.get("/incomes/:id", income.controller.getIncome)
router.post("/incomes/multiple-users", income.controller.createIncomeMultipleUsersWrapper)
router.patch("/incomes/:id", income.controller.updateIncome)
router.delete("/incomes/:id", income.controller.deleteIncome)

// For testing purposes
router.post("/users/create-admin", user.controller.createAdmin)
router.get("/dp", dp.controller.getDynamicPrices)

export default router
