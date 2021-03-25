
let { User } = require('../../models/')

exports.getUsers = async (req, res) => {

	try{
		const users = await User.findAll();
		res.send({
			status: "success",
			message: "All users was successfully display",
			data: {
				users,
			}
		});
	}catch (err){
		console.log(err)
		res.status(500).send({
			status: "error",
			message: "Server error",
		});
	}

};

exports.deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		await User.destroy({
			where: {
				id,
			},
		});

		res.send({
			status: "success",
			message: "User Succesfully Delete",
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};