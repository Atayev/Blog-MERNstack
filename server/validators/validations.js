import { body } from 'express-validator'

export const signupValidation = [
    body('email','Incorrect format of email, Please enter correct').isEmail(),
    body('password','Password must be at least 5 symbols').isLength({ min: 5 }),
    body('fullName','Enter Your Name').isLength({ min: 3 }),
    body('avatarUrl','Not Correct URL').optional().isURL(),  
]
export const signinValidation = [
    body('email','Incorrect format of email, Please enter correct').isEmail(),
    body('password','Password must be at least 5 symbols').isLength({ min: 5 }),
]
export const postCreateValidation = [
    body('title','Write title of post').isLength({min:3}).isString(),
    body('text','Write text of post').isLength({ min: 10 }).isString(),
    body('tags','Please write tags for posts(optional)').optional().isString(),
    body('imageUrl','Not Correct URL of image').optional().isString(),  
]