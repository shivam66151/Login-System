const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req,res,next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
       if(err) {
           res.json({
               error: err
           })
       }
       let user = new User ({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        department: req.body.department,
        password: hashedPass
    })
    user.save()
    .then(user => {
       res.json({
           message: "User Added Successfully"
       }) 
    })
    .catch(error => {
        res.json({
            message: "Error occured!"
        })
    })
    
    })
}


const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [{email:username},{password:username}]})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if(err) {
                    res.json({
                        error: err
                    })
                }
                if(result) {
                    let token = jwt.sign({name: user.name}, '!access^token^secret*key', {expiresIn: '30s'})
                    let refreshtoken = jwt.sign({name: user.name}, 'refreshtokensecret', {expiresIn: '30h'})
                    res.json({
                        message: 'Login Successfully',
                        token,
                        refreshtoken
                    })
                }else {
                    res.json({
                        message: 'Password does not match!'
                    })
                }
            })
        } else {
            res.json({
                message: 'No user Found'
            })
        }
    })
}


const refreshToken = (req, res, next) => {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, 'refreshtokensecret', function(err, decode) {
          if(err) {
              res.status(400).json({
                  err
              }) 
          } else {
              let token = jwt.sign({ name: decode.name}, '!access^token^secret*key', {expiresIn: '60s'})
              let refreshToken = req.body.refreshToken
              res.status(200).json({
                  message: 'Token refreshed succesfully',
                  token, 
                  refreshToken
              })
          }
    })
}

module.exports = {
    register, login, refreshToken
}