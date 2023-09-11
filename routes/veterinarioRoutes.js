import express from 'express';
import  {perfil, registrar, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword}  from '../controllers/veterinariosControllers.js';
const router = express.Router();
import checkAuth from '../middleware/authMiddleware.js';

//rutas publicas
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
//Las rutas para recuperar la contraseña son tres, una para validar email, otro para leer el token y otro para almacenarlo
router.post('/olvide-password', olvidePassword); 
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);

//rutas privadas
router.get('/perfil', checkAuth, perfil );

export default router;