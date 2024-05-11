import mongoose, { Document, Model, Schema } from "mongoose"
import bcrypt from "bcrypt"
import { PassInUse } from "./PassInUse"
import { Pass } from "./Pass"
import { Service } from "./Service"

const SALT_FACTOR = 10

export interface IUser extends Document {
    createdAt: Date
    email: string
    isActive: boolean
    isAdmin: boolean
    name: string
    _id: Schema.Types.ObjectId
    ownerId: Schema.Types.ObjectId
    password: string
    updatedAt: Date
    services?: typeof Service
    passes?: typeof Pass
    passesInUse: typeof PassInUse
    myUsers: (typeof User)[]

    comparePassword: (candidatePassword: string, callback: (error: Error | null, isMatch: boolean) => void) => void
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    createdAt: { type: Date, required: false, default: Date.now },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: false, default: true },
    isAdmin: { type: Boolean, required: false, default: false },
    name: { type: String, required: false },
    _id: { type: Schema.Types.ObjectId, required: true },
    ownerId: { type: Schema.Types.ObjectId, required: true },
    password: { type: String, required: true },
    updatedAt: { type: Date, required: false, default: Date.now },
})

// hook
UserSchema.pre<IUser>("save", function (next) {
    const user = this

    // hash password
    bcrypt.genSalt(SALT_FACTOR, (error, salt) => {
        if (error) {
            return next(error)
        }
        bcrypt.hash(user.password, salt, (err, encrypted) => {
            if (err) {
                return next(err)
            }
            user.password = encrypted
            next()
        })
    })
})

UserSchema.methods.comparePassword = function (
    candidatePassword: string,
    callback: (error: Error | null, isMatch: boolean) => void
): void {
    const user = this
    bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
        if (error) {
            callback(error, false)
        }
        callback(null, isMatch)
    })
}

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema)
