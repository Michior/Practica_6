import argon2 from "argon2";

//genera un hash seguro para una contraseña en texto plano
export async function hashPassword(plainPassword: string): Promise<string> {
    return await argon2.hash(plainPassword);
}

//valida si una contraseña en testo plano coincide con su vrsion encriptada
export async function validatePassword(plainPassword:string, hashedPassword: string): Promise<boolean> {
    return await argon2.verify(hashedPassword, plainPassword);
}