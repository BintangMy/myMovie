let { User } = require("../models")
let { jwtToken } = require('../helpers/jwt')
const bcrypt = require('bcryptjs')

class UserController {

    static async register(req, res, next) {
        try {
            console.log('masuk userrrrrrrr')
            let { username, email, password } = req.body
            await User.create({ username, email, password })
            res.status(201).json({ message: `success create account ${username}` })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let { email, password } = req.body

            if (!email || !password) {
                throw { name: "EmailOrPasswordRequired" }
            }

            let user = await User.findOne({
                where: { email }
            })

            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                throw { name: "PasswordInValid" }
            }

            let payload = {
                id: user.id
            }

            console.log(user,'<<<<<<<<<<<<')
            let access_token = jwtToken(payload)
            res.status(200).json({access_token, username: user.username, email: user.email })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = { UserController }