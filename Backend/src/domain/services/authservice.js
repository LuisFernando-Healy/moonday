import bcrypt from 'bcryptjs'; // hashear contraseñas
import jwt from 'jsonwebtoken'; //una libreria jwt para tokens de validacion
import { userModel } from '../../infraestructure/database/Models/user';


export const authservice = {

    register : async (userModel) =>{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userModel.password,salt)

        const newUser = await userModel.create({
            username,
            password : hashedPassword,
            role,
            associatedClientId


        })
        
        return { id : newUser._id,  username: newUser.username, role : newUser.role , alma: newUser.username}
    },

    login: async ({username,password})=>{
        const user = await userModel.find({
            username
        })

        if(!user){
            throw new Error ('usuario no encontrado')
        }

        const isValidPassword = await bcrypt.compare(password,user.password) 
        if(!isValidPassword){
            throw new Error ('contrasena incorrecta')
        }

        const token = jwt.sign({
            id: user._id, role: user.role,clietId:user.associatedClientId
        }, process.env.JWT_SECRET || 'token secreto', {
            expiresIn: "5h"
        })
        return {token, user:{username: user.username, role: user.role, associatedClientId: user.associatedClientId}}
    }

}
