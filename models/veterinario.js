import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcrypt'
import generarId from '../helpers/generarId.js'

const veterinarioSchema = new Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarId(),
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

veterinarioSchema.pre('save', async function (next) {
    if(!this.isModified('password')){ //Si el password ya esta hasheado no ejecutara esta funcion
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
}) //se ejecuta antes de guardar el registro permitiendo modificar los datos que se van a enviar.

veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);
};

const veterinario = mongoose.model("veterinario", veterinarioSchema);
export default veterinario;

