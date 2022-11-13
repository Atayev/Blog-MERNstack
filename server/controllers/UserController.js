import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import UserModel from '../models/User.js'


export const signUp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash:hash,
        })
        const user = await doc.save();
        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {
            expiresIn:'24h'
        })
        const {passwordHash,...userData} = user._doc
        res.json({
            ...userData,
            token
        })
    } catch (error) {
        console.log(error)
        res.json({
            message:'Not signed up'
        }).status(500)
    }
}
export const signIn =async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        
        if (!user) {
            return res.status(404).json({
                message:'No such user found'
            })
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if (!isValidPassword) {
            return res.status(404).json({
                message:'Uncorrect login or password'
            })
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {
            expiresIn:'24h'
        })
        const {passwordHash,...userData} = user._doc
        res.json({
            ...userData,
            token
        })
    } catch (error) {
        console.log(error)
        res.json({
            message:'Not signed in'
        }).status(500)
    } 
}
export const getUser =async(req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.status(404).json({
                message:'No such user found'
            })
        }
        const {passwordHash,...userData} = user._doc
        res.json({
            ...userData,
        })
       
    } catch (error) {
        console.log(error)
        res.json({
            message:'Something went wrong'
        }).status(500)
    }
}