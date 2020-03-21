const responseObject = require('../helpers/responseObject')
const { encode } = require('../helpers/jwt')
const User = require('../models/user.model')
const Admin = require('../models/admin.model')
const CRUD = require('../helpers/crud')

class AuthController {
    static async login(req, res) {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password }).populate('placesFK').exec()
        console.log(user)
        if (user !== null) {
            user.password = undefined
            let token = encode(JSON.stringify(user))
            res.setHeader('token', token) // set token in header
            res.status(200).send(responseObject(true, User, 'Logged in')) // send a response
        } else {
            res.status(404).send(responseObject(false, null, 'User not found'))
        }
    }

    static async register(req, res) {
        await CRUD.create(req.body, User)
            .then(response => {
                res.status(201).send(response)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }

    static async adminLogin (req,res){
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username, password }).populate('placesFK').exec()
        console.log(admin)
        if (admin !== null) {
            admin.password = undefined
            let token = encode(JSON.stringify(admin))
            res.setHeader('token', token) // set token in header
            res.status(200).send(responseObject(true, Admin, 'Logged in')) // send a response
        } else {
            res.status(404).send(responseObject(false, null, 'Admin not found'))
        }
    }
}

module.exports = AuthController