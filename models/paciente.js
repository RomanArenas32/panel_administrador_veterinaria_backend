import mongoose from "mongoose";

const pacienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
    },
    propietario: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    fecha: {
        type: Date,
        require: true,
        default: Date.now(),
    },
    sintomas: {
        type: String,
        require: true,
    },
    veterinario: {
        type: mongoose.Schema.Types.ObjectId,  //Hace referencia al id del veterinario
        ref: 'Veterinario' //Se le debe dar el nombre del modelo a relacional
    },    
}, {
    timestamps: true, //Crea las columnas de creado y editado 
});

const Paciente = mongoose.model("paciente", pacienteSchema);
export default Paciente;