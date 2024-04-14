import { model, Schema, ObjectId } from "mongoose"

interface IUser {
    _id: ObjectId,
    name: string,
    password: string,
    accessToken: string
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessToken: Schema.Types.String
})

export const User = model<IUser>("Users", UserSchema)