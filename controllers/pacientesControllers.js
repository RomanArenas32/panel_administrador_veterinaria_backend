import Paciente from "../models/paciente.js";

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    try {
        const PacienteGuardado = await paciente.save();
        res.status(200).json({ PacienteGuardado })
    } catch (error) {
        console.log(error)
    }

}
const obtenerPaciente = async (req, res) => {
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);
    res.status(200).json({ pacientes })
}


const obtenerUnPaciente = async (req, res) => {
    const { id } = req.params
    const paciente = await Paciente.findById(id);

    if (!paciente) {
        return res.status(400).json({
            msg: 'Paciente no encontrado'
        })
    }
    //Las variables son iguales pero al ser objetos se evaluan como diferentes y por eso hay que pasarlas a string
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        const error = new Error('Error al acceder al paciente, es posible que sea paciente de otro veterinario o no exista')
        return res.status(409).json({ msg: error.message })
    }

    return res.json({ paciente })

}
const actualizarPaciente = async (req, res) => {
    const { id } = req.params
    const paciente = await Paciente.findById(id);
    if (!paciente) {
        return res.status(400).json({
            msg: 'Paciente no encontrado'
        })
    }
    //Las variables son iguales pero al ser objetos se evaluan como diferentes y por eso hay que pasarlas a string
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        const error = new Error('Error al acceder al paciente, es posible que sea paciente de otro veterinario o no exista')
        return res.status(409).json({ msg: error.message })
    }
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save(); //si sale bien la instruccion anterior lo guardamos
        return res.json({ pacienteActualizado })

    } catch (error) {
        console.log(error)
    }
}

const eliminarPaciente = async (req, res) => {

    const { id } = req.params
    const paciente = await Paciente.findById(id);
    if (!paciente) {
        return res.status(400).json({ msg: 'Paciente no encontrado' })
    }
    //Las variables son iguales pero al ser objetos se evaluan como diferentes y por eso hay que pasarlas a string
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.status(409).json({ ms: 'Accion no valida' })
    }

    try {
        await paciente.deleteOne();
        res.json({msg: 'Paciente eliminado correctamente'});

    } catch (error) {
        console.log(error)
    }
}
export {
    agregarPaciente,
    obtenerPaciente,
    obtenerUnPaciente,
    actualizarPaciente,
    eliminarPaciente
}