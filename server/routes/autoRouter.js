const Router = require('express');
const multer  = require('multer')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
})

let fileFilter = function (req, file, callback) {
    let allowedExtensions = ['docs', 'pdf', 'png', 'jpeg', 'jpg']
    let extArray = file.mimetype.split("/");
    let ext = extArray[extArray.length - 1];
    if(!allowedExtensions.includes(ext)) {
        return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
}

let limits = {
    fileSize: 1024 * 1024
}

const upload = multer({ storage, fileFilter, limits})
const router = new Router();
const authController = require('../controllers/authController')
const courseController = require('../controllers/courseController');
const formController = require('../controllers/formController');

const roleMiddleware = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const applicationController = require('../controllers/applicationController');


router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);
router.get('/users', authMiddleware, roleMiddleware(['admin']), authController.getUsers);

router.get('/courses', authMiddleware, roleMiddleware(['admin', 'manager']), courseController.getCourses);
router.get('/courses/:id', authMiddleware, roleMiddleware(['admin', 'manager']), courseController.getCourseId);
router.post('/courses/create', authMiddleware, roleMiddleware(['admin', 'manager']), courseController.createCourse);
router.patch('/courses/edit/:id', authMiddleware, roleMiddleware(['admin', 'manager']), courseController.patchEditCourse);
router.patch('/courses/close', authMiddleware, roleMiddleware(['admin', 'manager']), courseController.patchCoursesClose);
router.patch('/courses/open', authMiddleware, roleMiddleware(['admin', 'manager']), courseController.patchCoursesOpen);
router.delete('/courses', authMiddleware, roleMiddleware(['admin', 'manager']), courseController.deleteCourse);
router.delete('/courses/:id', authMiddleware, roleMiddleware(['admin', 'manager']), courseController.deleteCourseId);


router.get('/form', authMiddleware, roleMiddleware(['admin', 'manager']), formController.getFormByCourseId);
router.get('/forms', authMiddleware, roleMiddleware(['admin', 'manager']), formController.getAllForms);
router.get('/forms/archieve', authMiddleware, roleMiddleware(['admin', 'manager']), formController.getFormsArchieve);
router.get('/forms/:id', authMiddleware, roleMiddleware(['admin', 'manager']), formController.getFormId);
router.post('/forms/create', authMiddleware, roleMiddleware(['admin', 'manager']), formController.createForm);
router.patch('/forms/edit/:id', authMiddleware, roleMiddleware(['admin', 'manager']), formController.patchEditForm);
router.patch('/forms/archieve', authMiddleware, roleMiddleware(['admin', 'manager']), formController.archieveForm);
router.patch('/forms/archieve/:id', authMiddleware, roleMiddleware(['admin', 'manager']), formController.archieveFormId);
router.patch('/forms/rearchieve/:id', authMiddleware, roleMiddleware(['admin', 'manager']), formController.reArchieveFormId);


router.get('/application/create', authMiddleware, roleMiddleware(['admin', 'manager', 'student']), applicationController.getApplication);
router.get('/user/applications', authMiddleware, roleMiddleware(['admin', 'manager', 'student']), applicationController.getAllApplicationByUser);
router.get('/application/:id', authMiddleware, roleMiddleware(['admin', 'manager', 'student']), applicationController.getApplicationId);
router.get('/application/submit/:id', authMiddleware, roleMiddleware(['admin', 'manager', 'student']), applicationController.getApplicationSubmit);
router.post('/application/save', authMiddleware, roleMiddleware(['admin', 'manager', 'student']), upload.fields([{ name: 'docs', maxCount: 10 }, { name: 'cheque', maxCount: 1 }]), applicationController.postApplicationSave);

router.get('/applications', authMiddleware, roleMiddleware(['admin', 'manager']), applicationController.getAllApplication);
router.get('/manager/application/create', authMiddleware, roleMiddleware(['admin', 'manager']), applicationController.getManagerApplicationCreate);



module.exports = router;