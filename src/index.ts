import express from "express";
import router from "./routes";
import { connectBD } from "./config/db";

const PORT = 3000;
const app = express();

app.use(express.json()); //middleware para procesar JSON en las solicitudes
app.use("/", router); //configuracion de rutas
connectBD();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;