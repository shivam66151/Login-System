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

// Show Individual student
const show = (req, res, next) => {
    let studentID = req.body.studentID
    Student.findById(studentID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

//storing/ adding student data in db

const store = (req, res, next) => {
    let student = new Student({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        department: req.body.department
    })
    if(req.file) {
        student.face = req.file.path
    }
    student.save()
    .then(response => {
        res.json({
            message: 'Student Added Successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurred while saving'
        })
    })
}

// update an student data

const update = (req, res, next) => {
    let studentID = req.body.studentID

    let updatedData  = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        department: req.body.department
    }

    Student.findByIdAndUpdate(studentID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'Student Updated successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurred while updating'
        })
    })
}


//delete an student Data
const destroy = (req, res, next) => {
    let studentID = req.params.studentID
    Student.findByIdAndRemove(studentID)
    .then(() => {
        res.json({
            message: 'Student data deleted'
        })
    })
    .catch(error => {
        res.json({
            message: 'AN error occurred while deleting'
        })
    })
}


module.exports = {
    index, show, store, update, destroy

}