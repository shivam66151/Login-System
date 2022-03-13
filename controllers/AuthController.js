const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req,res,next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedpass) {
       if(err) {
           res.json({
               error: err
           })
       }
    })
}

let user = new User ({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    department: req.body.department,
    password: req.body.password
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

module.exports = {
    register
}