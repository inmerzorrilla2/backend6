const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getAll = catchError(async(req, res) => {
    const {id} = req.user
    const results = await User.findAll({where: {id}});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await User.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;

// impedir que se actualice el mail, el phone y el password
for(let i in req.body){
    delete req.body.email
    delete req.body.password
    delete req.body.phone
}
    
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req, res) =>{
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if(!user) return res.status(401).json({message: "Invalid Credentials"})

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) return res.sendStatus(401)

    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn: '30d'}
    )

    return res.json({user, token})
})


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
}