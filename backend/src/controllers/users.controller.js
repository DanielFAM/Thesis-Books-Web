const usersCtrl = {};
const User = require ('../models/users.js');

usersCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

usersCtrl.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id,{password: 0});
    res.json(user);
};

usersCtrl.createUser = async (req, res) => {
    const user = new User(req.body);
    user.password = await user.encryptPassword(user.password);
    await user.save();
    res.json({status: 'user created'});
};

usersCtrl.deleteUser = async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if(user === null) return res.json({status: 'The user has been already deleted'});
    res.json({status: 'User deleted', user});
};

module.exports = usersCtrl;