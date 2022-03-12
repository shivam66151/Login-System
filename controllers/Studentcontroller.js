const Student = require('../models/Student')

//SHow the list of Student
const index = (req,res,next) => {
    Student.find()
    .then(response => {
        res.json({response})
    })
    .catch(error => {
        res.json({
            messsage: 'An error Occured!'
        })
    })
}