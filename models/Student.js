const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

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

studentSchema.plugin(mongoosePaginate)

const Student = mongoose.model('Student', studentSchema)
module.exports = Student