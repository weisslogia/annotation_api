import mongoose from "mongoose";
const User = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profile_picture: {type: String, required: false},
    role: {type: String, required: true, default: 'client'},
    phone: {type: String, required: false},
    email: {type: String, required: false},
    created_at: {type: String, required: true},
    updated_at: {type: String, required: true},
})
const UserSchema = mongoose.model("users", User);
export default UserSchema;