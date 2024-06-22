import User from "../models/User.js"
import bcrypt from "bcrypt"

const emailExist = async (email) => {
    const emailExist = await User.findOne({email: email})
    if(emailExist) {return true}
    return false
}
const checkPasswordLength = (pswd) => {
    if(pswd.length < 6){return false}
    return true
}
const comparePassword = async (pswd,pswd_user) => {
    if (await bcrypt.compare(pswd,pswd_user)){return true}
    return false
}
export default {emailExist,checkPasswordLength,comparePassword}