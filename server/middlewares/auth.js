let { User, Post, Category } = require("../models")
let {decoded} = require('../helper/jwt')

async function authentication(req, res, next) {
    try {
        let access_token = req.headers.access_token
        if(!access_token){
            throw {name: "Unauthenticated"}
        }

        let payLoad = decoded(access_token)
        let user = await User.findByPk(payLoad.id)
        if(!access_token){
            throw {name: "Unauthenticated"}
        }

        req.user = {id: user.id, role:user.role, username: user.username, email:user.email} 
        next()
    } catch (error) {
        next(error)
    }
}



module.exports = { authentication}