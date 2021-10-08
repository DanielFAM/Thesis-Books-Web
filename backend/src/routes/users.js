const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const { getUsers, 
    getUserById,
    createUser
} = require('../controllers/users.controller');

const User = require ('../models/users');

//retornar todos los usuarios registrados en BD
router.get('/', getUsers);
//retirnar usuario especifico basado en su ID
router.get('/:id', getUserById);
//Crear un nuevo usuario
router.post('/create', createUser);
//Borrar algun usuario en base a su ID
router.delete('/delete/:id', );

//Registro de usuario nuevo
router.post('/signup', async (req,res,next) => {
    const { username, email, password } = req.body;
    const user = new User ({username, email, password});
    user.password = await user.encryptPassword(user.password);
    await user.save();
    //Creación del token de autenticación que vence en 1 dia
    //Pide el id del objeto mas una cadena secreta
    //finalmente pide el tiempo en segundos en el que expirara
    const token = jwt.sign({id: user._id}, process.env.SECRET, {
        expiresIn: 60 * 60 * 24
    })
    res.json({auth: true, token})
});

//Autorización de navegación mediante token de usuario
router.get('/me', async (req,res,next) => {
    const user = await User.findById(req.userId, { password: 0 });
    if(!user){
        //Si el usuario no existe manda error
        return res.status(404).send('No user found');
    }
    //si existe envia los datos del usuario que esten en la BD
    res.json(user);
});

//Inicio de sesión del usuario
router.post('/signin', async (req,res,next) => {
    const { email, password } = req.body;
    const user = await User.findOne({email: email})
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
});


module.exports = router;