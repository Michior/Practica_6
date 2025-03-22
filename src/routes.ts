import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) =>{
    res.status(200).send("Bienvenido a la API 🚀");
});

router.post("/auth/register", (req, res) => {
    console.log(req.body);
    res.status(201).json({message: "Datos del usuario recibidos con exito"});
});

export default router; 