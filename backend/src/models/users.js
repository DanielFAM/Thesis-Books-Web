const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

//metodo de encriptación de contraseñas utilizando salt
userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

//Metodo de validación de contraseñas
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

module.exports = model('User',userSchema);