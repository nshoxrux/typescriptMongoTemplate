import { model, Schema, ObjectId } from "mongoose";

export interface ICategory {
    _id: ObjectId
    title: string
}

const CategorySchema = new Schema<ICategory>({
    title: { type: String, required: true, unique: true }
})

export const Category = model<ICategory>("Categories", CategorySchema)