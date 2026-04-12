const Classification = require('../models/Classification');

exports.getStats = async (req, res) => {
	try {
		const total = await Classification.countDocuments();
		const categories = await Classification.aggregate([
				{ $group: { _id: { $toLower: '$category' }, count: { $sum: 1 } } }
		]);
		// Always include all categories with 0 if missing
		const allCategories = ['trash', 'plastic', 'metal'];
		const counts = allCategories.reduce((acc, cat) => {
			const found = categories.find((c) => c._id === cat);
			acc[cat] = found ? found.count : 0;
			return acc;
		}, {});
		res.json({ total, ...counts });
	} catch (err) {
		res.status(500).json({ message: 'Failed to get stats', error: err.message });
	}
};

exports.getHistory = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;
		const total = await Classification.countDocuments();
		const data = await Classification.find()
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);
		res.json({ total, page, limit, data });
	} catch (err) {
		res.status(500).json({ message: 'Failed to get history', error: err.message });
	}
};

exports.getDailyStats = async (req, res) => {
	try {
		const sevenDaysAgo = new Date();
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
		const stats = await Classification.aggregate([
			{ $match: { createdAt: { $gte: sevenDaysAgo } } },
			{
				$group: {
					_id: {
						day: { $dateToString: { format: '%Y-%m-%d', damongte: '$createdAt' } },
						category: { $toLower: '$category' },
					},
					count: { $sum: 1 },
				},
			},
			{
				$group: {
					_id: '$_id.day',
					categories: {
						$push: { category: '$_id.category', count: '$count' },
					},
				},
			},
			{ $sort: { _id: 1 } },
		]);
		res.json(stats);
	} catch (err) {
		res.status(500).json({ message: 'Failed to get daily stats', error: err.message });
	}
};
