const { Router } = require("express");
const router = Router();

const { signUp, 
        signIn, 
        me,
        verifyToken,
        googleLogin
} = require('../controllers/auth.controller');

const { 
        checkDuplicatedUsernameOrEmail
} = require('../middlewares/verifySignup');

//Registro de usuario nuevo
router.post('/signup', checkDuplicatedUsernameOrEmail, signUp);

//Autorización de navegación mediante token de usuario
router.get('/me', me);

//Inicio de sesión del usuario
router.post('/signin', signIn);

router.get('/verifyToken', verifyToken);

router.post('/googlelogin',googleLogin);

module.exports = router;