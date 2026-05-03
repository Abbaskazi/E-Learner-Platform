
const express = require('express');
const {
  getCourses,
  getCourse,
  createCourse,
  enrollCourse,
  updateProgress,
  submitTest,
  getCertificate
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getCourses)
  .post(protect, authorize('admin'), createCourse);

router.route('/:id').get(protect, getCourse);
router.post('/enroll/:courseId', protect, enrollCourse);
router.post('/progress/:courseId/module/:moduleId', protect, updateProgress);
router.post('/test/:courseId/submit', protect, submitTest);
router.get('/certificate/:courseId', protect, getCertificate);

module.exports = router;
