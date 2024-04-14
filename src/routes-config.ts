import express from "express"
const router = express()

import AuthController from "./users/auth.controller"
import UsersController from "./users/users.controller"
import CategoriesController from "./categories/categories.controller"
import ProductsController from "./categories/categories.controller"

router.use("/auth", AuthController)
router.use("/users", UsersController)
router.use("/categories", CategoriesController)
router.use("/products", ProductsController)

export default router