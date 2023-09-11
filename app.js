import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacientesRouter from './routes/pacientesRouter.js';
import conectarDB from './database/config.js';
dotenv.config();
const app = express();


const PORT = process.env.PORT || 4000;

conectarDB();

//configuracion de cors
const dominiosPermitidos = [process.env.FRONTEND_URL, 'http://localhost:4000']
const corsOptions = {
    origin: function(origin, callbacks){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            //El origen del request esta permitido si se cumple la condicion
            callbacks(null, true)
        }else{
            callbacks(new Error('Acceso no permitido desde esta url'));
            console.log(origin)
        }
    }
}
app.use(cors(corsOptions));
//fin configuracion de los cors

app.use(express.json());
app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacientesRouter)


app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
});