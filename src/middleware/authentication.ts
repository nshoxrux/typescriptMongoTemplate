import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { User } from "../users/user.entity"
import { ApiError } from "../error/api"
import { userError } from "../error/messages"
import { ACCESS_TOKEN } from "../config"

export function authenticateToken(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    const authHeader = req.headers["authorization"]
    const token = authHeader?.split(" ")[1]
    if ( !token ) {
        return res.status(401).json(
            ApiError.unauthorized(userError.unauthorized)
        )
    }
    const verifiedToken = jwt.verify(token, ACCESS_TOKEN)
    if (verifiedToken && typeof verifiedToken == "object") {
        User.findOne({_id: verifiedToken.userId})
        .then((data) => {
            if (!data) {
                throw ApiError.internal(userError.notFound)
            }
            res.locals.user = verifiedToken.userId
            next()
        }).catch((err) => {
            return res.status(500).json(
                ApiError.internal(err.message)
            )
        })
    } else {
        return res.status(403).json(
            ApiError.forbidden(userError.forbidden)
        )
    }
}