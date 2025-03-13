import { body } from "express-validator";

export const validateUser = [
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("lastname").notEmpty().withMessage("El apellido es obligatorio"),
    body("email").isEmail().withMessage("Debe proporcionar un email válido"),
    body("phone").isMobilePhone().withMessage("Debe proporcionar un número de teléfono válido"),
    body("rol").notEmpty().withMessage("El rol es obligatorio"),
    body("message").optional().isString().withMessage("El mensaje debe ser un texto"),
];
