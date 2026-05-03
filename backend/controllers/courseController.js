
const Course = require('../models/Course');
const User = require('../models/User');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    let isEnrolled = false;
    if (req.user) {
      const user = await User.findById(req.user._id);
      isEnrolled = user.enrolledCourses.some(id => id.toString() === req.params.id);
    }

    res.status(200).json({
      success: true,
      course: { ...course.toObject(), isEnrolled }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    req.body.createdBy = req.user._id;
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const user = await User.findById(req.user._id);
    const isEnrolled = user.enrolledCourses.some(id => id.toString() === courseId);
    
    if (isEnrolled) {
      return res.status(400).json({ success: false, message: 'Already enrolled in this course' });
    }

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { enrolledCourses: courseId },
        $push: {
          progress: {
            courseId: courseId,
            completedModules: [],
            testScore: 0,
            passed: false
          }
        }
      }
    );

    const updatedUser = await User.findById(req.user._id).populate('enrolledCourses');
    res.status(200).json({ success: true, message: 'Enrolled successfully', user: updatedUser });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const moduleId = req.params.moduleId;
    
    const user = await User.findById(req.user._id);
    const progressIndex = user.progress.findIndex(p => p.courseId.toString() === courseId);

    if (progressIndex === -1) {
      return res.status(400).json({ success: false, message: 'Not enrolled in this course' });
    }

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { [`progress.${progressIndex}.completedModules`]: moduleId }
      }
    );

    const updatedUser = await User.findById(req.user._id);
    res.status(200).json({ success: true, progress: updatedUser.progress[progressIndex] });
  } catch (error) {
    console.error('Progress update error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.submitTest = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const user = await User.findById(req.user._id);
    const progressIndex = user.progress.findIndex(p => p.courseId.toString() === req.params.courseId);

    if (progressIndex === -1) {
      return res.status(400).json({ success: false, message: 'Not enrolled in this course' });
    }

    const progress = user.progress[progressIndex];
    if (progress.completedModules.length !== course.modules.length) {
      return res.status(400).json({ 
        success: false, 
        message: 'Complete all modules first' 
      });
    }

    const { answers } = req.body;
    let correct = 0;

    course.mcqs.forEach((mcq, index) => {
      if (answers[index] === mcq.correctAnswer) {
        correct++;
      }
    });

    const score = (correct / course.mcqs.length) * 100;
    const passed = score >= course.passingCriteria;

    user.progress[progressIndex].testScore = score;
    user.progress[progressIndex].passed = passed;
    if (passed) {
      user.progress[progressIndex].completionDate = new Date();
    }
    await user.save();

    res.status(200).json({
      success: true,
      score,
      passed,
      total: course.mcqs.length,
      correct
    });
  } catch (error) {
    console.error('Test submission error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCertificate = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const user = await User.findById(req.user._id);
    const progress = user.progress.find(p => p.courseId.toString() === req.params.courseId);

    if (!progress || !progress.passed) {
      return res.status(400).json({ 
        success: false, 
        message: 'You must pass the test to download the certificate' 
      });
    }

    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=certificate-${course.title}.pdf`);

    doc.pipe(res);

    doc
      .fontSize(30)
      .text('Certificate of Completion', { align: 'center' })
      .moveDown();

    doc
      .fontSize(20)
      .text('This is to certify that', { align: 'center' })
      .moveDown();

    doc
      .fontSize(25)
      .text(user.name, { align: 'center' })
      .moveDown();

    doc
      .fontSize(20)
      .text('has successfully completed the course', { align: 'center' })
      .moveDown();

    doc
      .fontSize(25)
      .text(course.title, { align: 'center' })
      .moveDown();

    doc
      .fontSize(15)
      .text(`Completion Date: ${new Date(progress.completionDate).toLocaleDateString()}`, { align: 'center' });

    doc.end();
  } catch (error) {
    console.error('Certificate error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
