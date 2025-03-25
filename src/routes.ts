import { Router, Request, Response } from "express";
import { createAccount, login } from "./controllers/User.Controller";
import { body } from "express-validator";

const router = Router();

router.get("/", (req: Request, res: Response) =>{
    res.status(200).send("Bienvenido a la API 🚀");
});

router.post("/auth/register", [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("password").isString().isLength({ min:8 })
        .withMessage("Password must be at least 8 characteres"),
    body("email").isEmail().withMessage("Invalid email"),
    body("username").isString().notEmpty().withMessage("Username is required")],
    async(req, res) => {
        createAccount(req, res);
    }
);

router.post("/auth/login", [
        body("email").isEmail().withMessage("Invalid Email"),
        body("password").notEmpty().withMessage("Password must be at least 8 characters"),
    ],
    async(req, res) => {
        login(req, res);
});

export default router; 