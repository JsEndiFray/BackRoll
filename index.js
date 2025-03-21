import express from "express";
import cors from "cors";
//envi
process.loadEnvFile();
import UserRoutes from "./src/routes/userRoute.js";
import RegisterRoutes from "./src/routes/registerRoute.js";



const app = express();
const port = process.env.PORT || 3500;



//middleware
app.use(express.json());
app.use(cors());


app.use("/api", UserRoutes);
app.use("/api", RegisterRoutes);

app.listen(port, () => {
    console.log(`Servidor conectado correctamente en el puerto ${port}`);
});