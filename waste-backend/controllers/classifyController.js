const Classification = require('../models/Classification');
const cloudinary = require('cloudinary').v2;
const axios = require('axios');
const FormData = require('form-data');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.classifyImage = async (req, res) => {
	if (!req.file) return res.status(400).json({ message: 'No image uploaded' });
	try {
		// Upload to Cloudinary
		const streamUpload = () => {
			return new Promise((resolve, reject) => {
				const stream = cloudinary.uploader.upload_stream(
					{ folder: 'waste-segregation' },
					(error, result) => {
						if (result) resolve(result);
						else reject(error);
					}
				);
				stream.end(req.file.buffer);
			});
		};
		const uploadResult = await streamUpload();

		// Send to ML service
		const form = new FormData();
		form.append('file', req.file.buffer, {
			filename: req.file.originalname,
			contentType: req.file.mimetype,
		});
		const mlRes = await axios.post(
			process.env.ML_SERVICE_URL + '/predict',
			form,
			{ headers: form.getHeaders(), timeout: 10000 }
		);
		const { category, confidence } = mlRes.data;
		if (!category || typeof confidence !== 'number') {
			throw new Error('Invalid response from ML service');
		}

		// Save to DB
		const classification = await Classification.create({
			imageUrl: uploadResult.secure_url,
			publicId: uploadResult.public_id,
			category,
			confidence,
		});

		res.status(201).json({
			id: classification._id,
			category,
			confidence,
			imageUrl: uploadResult.secure_url,
			createdAt: classification.createdAt,
		});
	} catch (err) {
		console.error('Classification error:', err);
		res.status(500).json({ message: 'Classification failed', error: err.message || String(err) });
	}
};
