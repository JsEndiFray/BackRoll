import { body } from "express-validator";

export const ValidatorRegister = [
    body("username").notEmpty().withMessage("El nombre de usuario es obligatorio"),
    body("password").notEmpty().withMessage("La contraseña es obligatoria"),
    body("email").isEmail().withMessage("Debe proporcionar un email válido"),
    body("rol").notEmpty().withMessage("El rol es obligatorio"),
    body("message").optional().isString().withMessage("El mensaje debe ser un texto")

]

