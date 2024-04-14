import express from "express"
import { CategoryService } from "./categories.service"
import { ApiError } from "../error/api"
import { ApiSuccess } from "../success/api"
import { itemError } from "../error/messages"
import { authenticateToken } from "../middleware/authentication"
const router = express()

router.post("/", authenticateToken, (req, res, next) => {
    CategoryService.create(req.body)
    .then((data) => {
        if (!data) {
            return next(ApiError.internal(itemError.action("category", "creating")))
        }
        return res.status(ApiSuccess.created).json(ApiSuccess.message("Category", "created"))
    }).catch((err) => {
        return next(ApiError.internal(err.message))
    })
})

router.get("/", authenticateToken, (req, res, next) => {
    CategoryService.getAll()
    .then((data) => {
        if ( data.length === 0 ) {
            return next(ApiError.notFound(itemError.emptyList("Categories")))
        }
        return res.status(ApiSuccess.OK).json(data)
    }).catch((err) => {
        return next(ApiError.internal(err.message))
    })
})

router.get("/:id", authenticateToken, (req, res, next) => {
    CategoryService.getOne(req.params.id)
    .then((data) => {
        if (!data) {
            return next(ApiError.notFound(itemError.notFound("Category")))
        }
        return res.status(ApiSuccess.OK).json(data)
    }).catch((err) => {
        return next(ApiError.internal(err.message))
    })
})

router.patch("/:id", authenticateToken, (req, res, next) => {
    CategoryService.update(req.params.id, req.body)
    .then((data) => {
        if (!data) {
            return next(ApiError.internal(itemError.action("category", "updating")))
        }
        return res.status(ApiSuccess.OK).json(ApiSuccess.message("Category", "updated"))
    }).catch((err) => {
        return next(ApiError.internal(err.message))
    })
})

router.delete("/:id", authenticateToken, (req, res, next) => {
    CategoryService.deleteOne(req.params.id)
    .then((data) => {
        if (!data) {
            return next(ApiError.internal(itemError.action("category", "deleting")))
        }
        return res.status(ApiSuccess.OK).json(ApiSuccess.message("Category", "deleted"))
    }).catch((err) => {
        return next(ApiError.internal(err.message))
    })
})

export default router