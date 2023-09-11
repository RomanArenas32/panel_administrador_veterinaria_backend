import mongoose from 'mongoose';


const conectarDB = async () => {
    try {
        const url = process.env.MONGO_ATLAS;
        await mongoose.connect(url);
        console.log("BASE DE DATOS ONLINE");
    } catch (error) {
        console.log(error)
        procces.exit(1)
    }

}
export default conectarDB;