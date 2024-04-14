import { Product, IProduct } from "./product.entity"

export class ProductService {
    static create(data: IProduct) {
        return Product.create(data)
    }
    static getAll() {
        return Product.find()
    }
    static getOne(id: string) {
        return Product.findOne({ _id: id })
    }
    static update(data: IProduct) {
        return Product.findOneAndUpdate(
            { _id: data._id }, 
            data,
            { new: true }
        )
    }
    static deleteOne(id: string) {
        return Product.findOneAndDelete({_id: id})
    }
}