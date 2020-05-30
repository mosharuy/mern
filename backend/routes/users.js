const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
	User.find().then((users) => res.json(users)).catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id([0-9a-f]{24})').get((req, res) => {
	User.findById(req.params.id).then((user) => res.json(user)).catch((err) => res.status(400).json('Error: ' + err));
});

//route with ES6 promise async/await
router.route('/:username').get(async (req, res) => {
	try {
		const user = await User.find({ username: req.params.username });
		res.json(user);
	} catch (err) {
		res.status(400).json('Error: ' + err);
	}
});

router.route('/add').post((req, res) => {
	const username = req.body.username;

	const newUser = new User({ username });

	newUser.save().then(() => res.json('User added!')).catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id([0-9a-f]{24})').post((req, res) => {
	User.findById(req.params.id)
		.then((user) => {
			user.username = req.body.username;

			user.save().then(() => res.json('User updated!')).catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:username').post((req, res) => {
	User.find({ username: req.params.username })
		.then((user) => {
			user.username = req.body.username;

			user.save().then(() => res.json('User updated!')).catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then(() => res.json('User deleted!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
