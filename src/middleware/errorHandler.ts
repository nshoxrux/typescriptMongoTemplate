import { Request, Response, NextFunction } from "express"
import { ApiError } from "../error/api"

export default function(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof ApiError) {
        return res.status(err.status).json(err)
    }
    
    return res.status(500).json({
        message: "Unexpected error",
        status: 500
    })
}