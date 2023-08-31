import User from "../models/user.model";
import { compareSync } from "bcrypt";
import JWT from 'jsonwebtoken';

export const login = async (username: string, password: string) => {
    const user_data = await User.findOne({username})
    if(!user_data) {
        return null
    }
    if(compareSync(password, user_data.password)) {
        const payload = {
            scope: 'mobile_app',
            iss: 'APP_SID',
            user: user_data,
            expires: Math.round((new Date().getTime()/1000)) + (3600 * 24)
        }
        const token = JWT.sign(payload, process.env.SECRET || 'secret')
        return token
    }
}