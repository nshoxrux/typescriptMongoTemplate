import { User } from "./user.entity"
import { ApiError } from "../error/api"
import { userError } from "../error/messages"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import { ObjectId } from "mongoose"
import { ACCESS_TOKEN } from "../config"

function generateJwt(id: ObjectId):any {
    return jwt.sign({userId: id}, ACCESS_TOKEN, {expiresIn: "24h"})
}

export class AuthService {
    static async register(name: string, password: string) {
        if (!name || !password) {
            throw ApiError.badRequest(userError.fieldsNotProvided)
        }

        const user = await User.findOne({ name })
        
        if (user) {
            throw ApiError.badRequest(userError.alreadyExists)
        }

        const hash = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, password: hash })
        
        const token = generateJwt(newUser._id)
        newUser.accessToken = token
        newUser.save()
        return token
    }

    static async login(name: string, password: string) {
        if (!name || !password) {
            throw ApiError.badRequest(userError.fieldsNotProvided)
        }
        
        const user = await User.findOne({ name })
        
        if (!user) {
            throw ApiError.notFound(userError.notFound)
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if (!isCorrectPassword) {
            throw ApiError.badRequest(userError.password)
        }
        
        const token = generateJwt(user._id)
        user.accessToken = token
        user.save()
        return token
    }
}