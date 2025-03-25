import mongoose, { Schema } from "mongoose";

//define la interfaz para le usuario, asegurando el tipado en TypeScript
interface IUser {
    name: string;
    email: string;
    password: string;
    username: string;
}

//define el esqeuma del usuario en la base de datos 
const userSchema = new Schema <IUser> ({
    name: {
        type : String,
        required: true, //OBLIGATORIO
        trim: true, //elimina espacios en blanco al inicio y al final 
    },
    email: {
        type : String,
        required: true, //OBLIGATORIO
        trim: true, //elimina espacios en blanco al inicio y al final 
        unique: true, //garantiza que el email sea unico en la base de datos
    }, 
    password: {
        type : String,
        required: true, //OBLIGATORIO
    }, 
    username: {
        type : String,
        required: true, //OBLIGATORIO
        trim: true, //elimina espacios en blanco al inicio y al final 
        unique: true,
        lowercase: true, 
    }, 
});

//crear el modelo de usuario basado en el esquema
const User = mongoose.model("User", userSchema);

export default User;