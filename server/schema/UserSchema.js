const mongoose = require('mongoose')
const {hashPassword} = require('../utils/auth.utils')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    tokens : [{
        type:String,
    }],
}, {
    timestamps:true,
})


userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    const hashedPassword =await hashPassword(this.password)
    this.password = hashedPassword
    next()
})

userSchema.statics.exists = async function(id){
    try {
        const user = await this.findOne({_id:id})
    if(user) throw new Error('User already exists')
    return user
    } catch (error) {
        throw error
    }
}

userSchema.statics.findByEmail = async function(email){
    try {
        const user = await this.findOne({email})
    if(user) throw new Error('User already exists')
    return true
    } catch (error) {
        throw error
    }
}

module.exports.User = mongoose.model('User', userSchema)