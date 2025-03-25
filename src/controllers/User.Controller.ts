import { Request, Response } from "express";
import User from "../models/Users"
import { hashPassword, validatePassword } from "../utils/auth";
import { validationResult } from "express-validator";

export const createAccount = async (req: Request, res: Response) => {
    let errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { name, password, email, username } = req.body;

    const userExists = await User.findOne({email});
    if (userExists){
        res.status(409).json({message: "User already exists for this email"});
        return;
    }

    const userNameExists = await User.findOne({username});
    if (userNameExists) {
        res.status(409).json({message: "Username already exists"});
        return;
    }
    
    const user = new User(req.body);
    user.password = await hashPassword(password);
    await user.save();
    res.status(201).json({message: "User created successfully"});
}

export const login = async(req: Request, res: Response) =>{
    //validar los errores en la solicitud
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    //extraer email y password del cuerpo de la solicitud
    const {email, password} = req.body
    //buscar al usuario en la base de datos
    const user = await User.findOne({ email })
    if (!user){
        const error = new Error("Invalid credentials")
        return res.status(401).json({error:error.message})
    }

    //comparar si el password es correcto 
    const isPasswordCorrect = await validatePassword(password, user.password)
    if(!isPasswordCorrect){
        const error = new Error("Invalid credentials")
        return res.status(401).json({error: error.message})
    }

    //si todo es correcto enviar respuesta de autenticacion exitos
    res.status(200).send("Authenticated")
}