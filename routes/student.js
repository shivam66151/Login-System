const express = require('express')
const router = express.Router()

const StudentController = require('../controllers/Studentcontroller')
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate, StudentController.index)
router.post('/show', StudentController.show)
// router.post('/store', StudentController.store)
router.post('/store', upload.single('avatar'), StudentController.store)
// router.post('/store', upload.array('avatar[]'), StudentController.store)  # for storing multiple files
router.post('/update', StudentController.update)
router.post('/delete', StudentController.destroy)


module.exports = router

