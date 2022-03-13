const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    department: {
        type: String
    },
    avatar: {
        type: String
    }
}, {timestamps: true})


const Student = mongoose.model('Student', studentSchema)
module.exports = Student