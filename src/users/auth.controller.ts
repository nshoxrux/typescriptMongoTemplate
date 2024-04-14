import express from "express"
import { AuthService } from "./auth.service"
import { ApiError } from "../error/api"
const router = express()

router.post("/register", (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    AuthService.register(req.body.name, req.body.password)
    .then((data) => {
        return res.status(201).json(data)
    }).catch((err: ApiError) => {
        console.log(err.message)
        next(err)
    })
})

router.post("/login", (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    AuthService.login(req.body.name, req.body.password)
    .then((data) => {
        return res.status(200).json(data)
    }).catch((err: ApiError) => {
        next(err)
    })
})

export default router