import { required } from "joi";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
 userDetails:{
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    isAdmin:{
        type: Boolean,
        required: true
    },
    status:{
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }
},
authDetails:{
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    salt:{
        type: String,
        required: true,
        select: false
    },
    sessionToken:{
        type: String,
        select: false
    }
}
});

export const UserModel =mongoose.model('User', UserSchema);
export const getUsers =()=>UserModel.find();
export const getUserByEmail=(email: string)=>UserModel.findOne({email});
export const getUserBySessionToken=(sessionToken:string)=>UserModel.findOne({'authDetails.sessionToken':sessionToken});
export const getUserById=(id:string)=>UserModel.findById(id);