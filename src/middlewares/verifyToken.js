import registerServices from "../services/registerServices.js";

export const verifyTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = registerServices.verifyToken(token); // Sin tipos innecesarios
        req.user = decoded; //El payload del token se guarda en req.user
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Token inválido o expirado" });
    }
};