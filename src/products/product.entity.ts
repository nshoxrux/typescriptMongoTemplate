import { model, Schema, ObjectId } from "mongoose";

export interface IProduct {
    _id: ObjectId
    title: string,
    price: number,
    inStock: number,
    category: ObjectId
}

const ProductSchema = new Schema<IProduct>({
    title: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    inStock: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: "Categories" }
})

export const Product = model<IProduct>("Products", ProductSchema)