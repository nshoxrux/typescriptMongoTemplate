import { Category, ICategory } from "./category.entity"

export class CategoryService {
    static create(data: ICategory) {
        return Category.create(data)
    }
    static getAll() {
        return Category.find().select("title")
    }
    static getOne(id: string) {
        return Category.findOne({ _id: id }).select("title")
    }
    static update(id: string, data: ICategory) {
        return Category.findOneAndUpdate(
            { _id: id }, 
            data,
            { new: true }
        )
    }
    static deleteOne(id: string) {
        return Category.findOneAndDelete({_id: id})
    }
}