const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

/*NOTE
  @route   GET api/auth
  @desc    Get token
  @access  Private
*/
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.header('Access-Control-Allow-Origin', '*');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server error' });
	}
});

/*NOTE
  @route   POST api/auth
  @desc    Authenticate user & get token
  @access  Public
*/
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please is required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			// See if user exits
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			// Return jsonwebtoken
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				process.env.jwtSecret,
				{
					expiresIn: 3600,
				},
				(err, token) => {
					if (err) throw err;
					res.header('Access-Control-Allow-Origin', '*');
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
