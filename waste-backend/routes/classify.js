const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const classifyController = require('../controllers/classifyController');

router.post('/', auth, (req, res, next) => {
	upload.single('image')(req, res, function (err) {
		if (err) {
			return res.status(400).json({ message: err.message });
		}
		next();
	});
}, classifyController.classifyImage);

module.exports = router;
