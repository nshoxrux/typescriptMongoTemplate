import express from "express"
import { UserService } from "./users.service"
import { ApiError } from "../error/api"
import { userError } from "../error/messages"
import { authenticateToken } from "../middleware/authentication"
const router = express()

router.get("/", authenticateToken, (
    req: express.Request, 
    res: express.Response, 
    next: express.NextFunction) => {
    UserService.getUsers()
    .then((data) => {
        if (data.length === 0) {
            throw ApiError.notFound(userError.emptyList)
        }
        return res.status(200).json(data)
    }).catch((err) => {
        next(err)
    })
})

router.get("/:id", authenticateToken, (
    req: express.Request, 
    res: express.Response,
    next: express.NextFunction) => {
    UserService.getOneUser(req.params.id)
    .then((data) => {
        return res.status(200).json(data)
    }).catch((err: ApiError) => {
        next(ApiError.internal(err.message))
    })
})

export default router