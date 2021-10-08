const authCtrl = {};
const User = require('../models/users');
const jwt = require('jsonwebtoken');

authCtrl.signUp = async (req, res) => {
    const user = new User (req.body);
    user.password = await user.encryptPassword(user.password);
    await user.save();
    //Creación del token de autenticación que vence en 1 dia
    //Pide el id del objeto mas una cadena secreta
    //finalmente pide el tiempo en segundos en el que expirara
    const token = jwt.sign({id: user._id}, process.env.SECRET, {
        expiresIn: 60 * 60 * 24
    })
    res.json({auth: true, token})
};

authCtrl.me = async (req,res) => {
    const user = await User.findById(req.userId, { password: 0 });
    if(!user){
        //Si el usuario no existe manda error
        return res.status(404).send('No user found');
    }
    //si existe envia los datos del usuario que esten en la BD
    res.json(user);
};

authCtrl.signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    if(!user){
        res.status(404).send("The email doesn't exists");
    }
    const validPassword = await user.validatePassword(password);
    if(!validPassword) {
        return res.status(401).json({auth: false, token: null})
    }
    const token = jwt.sign({id: user._id}, process.env.SECRET, {
        expiresIn: 60 * 60 * 24
    });
    res.json({auth:true, token});
};

module.exports = authCtrl;