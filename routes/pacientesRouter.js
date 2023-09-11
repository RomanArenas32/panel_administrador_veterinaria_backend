import express from 'express';
import { agregarPaciente, obtenerPaciente, obtenerUnPaciente, actualizarPaciente, eliminarPaciente } from '../controllers/pacientesControllers.js';
import checkAuth from '../middleware/authMiddleware.js';
const router = express.Router();


router.post('/', checkAuth, agregarPaciente);
router.get('/', checkAuth, obtenerPaciente);

router.get('/:id', checkAuth, obtenerUnPaciente);
router.put('/:id', checkAuth, actualizarPaciente);
router.delete('/:id', checkAuth, eliminarPaciente);



export default router