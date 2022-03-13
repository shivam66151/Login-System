const express = require('express')
const router = express.Router()

const StudentController = require('../controllers/Studentcontroller')

const Student = require('../models/Student')
const upload = require('../middleware/upload')

router.get('/', StudentController.index)
router.post('/show', StudentController.show)
// router.post('/store', StudentController.store)
router.post('/store', upload.single('face'), StudentController.store)
router.post('/update', StudentController.update)
router.post('/delete', StudentController.destroy)


module.exports = router

