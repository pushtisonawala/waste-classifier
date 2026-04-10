const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
	return jwt.sign(
		{ id: user._id, email: user.email, role: user.role },
		process.env.JWT_SECRET,
		{ expiresIn: '7d' }
	);
};

exports.register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const existing = await User.findOne({ email });
		if (existing) return res.status(409).json({ message: 'Email already registered' });
		const user = new User({ name, email, password });
		await user.save();
		const token = generateToken(user);
		res.status(201).json({ token });
	} catch (err) {
		res.status(500).json({ message: 'Registration failed', error: err.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) return res.status(401).json({ message: 'Invalid credentials' });
		const isMatch = await user.comparePassword(password);
		if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
		const token = generateToken(user);
		res.json({ token });
	} catch (err) {
		res.status(500).json({ message: 'Login failed', error: err.message });
	}
};
