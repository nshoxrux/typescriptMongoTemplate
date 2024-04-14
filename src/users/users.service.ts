import { User } from "./user.entity"

export class UserService {
    static getUsers() {
        return User.find().select("name")
    }

    static getOneUser(userId: string) {
        return User.findOne({ _id: userId }).select("name")
    }
}