import mongodb from 'mongoose'

const UserSchema = new mongodb.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    avatarUrl: String,

}, {
    timestamps:true,
    }
);

export default mongodb.model('User',UserSchema)