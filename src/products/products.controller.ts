import express from "express"
import { ProductService } from "./products.service"
import { ApiError } from "../error/api"
import { ApiSuccess } from "../success/api"
import { itemError } from "../error/messages"
const router = express()

router.post("/", (req, res, next) => {
    ProductService.create(req.body)
    .then((data) => {
        return res.status(ApiSuccess.created).json(ApiSuccess.message("Product", "created"))
    }).catch((err) => {
        return next(ApiError.internal(err.message))
    })
})

router.get("/", (req, res, next) => {
    ProductService.getAll()
    .then((data) => {
        if ( data.length === 0 ) {
            throw ApiError.notFound(itemError.emptyList("Products"))
        }
        return res.status(ApiSuccess.OK).json(data)
    }).catch((err) => {
        return next(err)
    })
})

router.get("/:id", (req, res, next) => {
    ProductService.getOne(req.params.id)
    .then((data) => {
        return res.status(ApiSuccess.OK).json(data)
    }).catch((err) => {
        return next(ApiError.internal(err.message))
    })
})

router.patch("/:id", (req, res, next) => {
    ProductService.update(req.body)
    .then((data) => {
        return res.status(ApiSuccess.created).json(ApiSuccess.message("Product", "updated"))
    }).catch((err) => {
        return next(ApiError.internal(err.message))
    })
})

router.delete("/:id", (req, res, next) => {
    ProductService.deleteOne(req.params.id)
    .then((data) => {
        return res.status(ApiSuccess.deleted).json(ApiSuccess.message("Product", "deleted"))
    }).catch((err) => {
        return next(ApiError.internal(err.message))
    })
})

export default router