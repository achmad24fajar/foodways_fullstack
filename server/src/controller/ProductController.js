let { Product, User } = require('../../models/')
const Sequelize = require('sequelize');
const Joi = require("joi");

exports.getProducts = async (req, res) => {
	try{
		const products = await Product.findAll({
			include: [
				{	
					model: User,
					attributes:{
						exclude: ["createdAt", "updatedAt", "role", "password"]
					},
				}
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "userId", "UserId"]
			}
		});

		res.send({
			status: "success",
			message: "Products Succesfully Get",
			data: {
				products,
			},
	    });
	} catch (err) {
		console.log(err);
	    res.status(500).send({
	        status: "error",
	        message: "Server Error",
	    });
	}
}

exports.getProductsByUser = async (req, res) => {
	try{
		const {id} = req.params;
		const products = await Product.findAll({
			where: {
				userId: id
			},
			attributes: {
				exclude: ["createdAt", "updatedAt", "userId", "UserId"]
			}
		});
		res.send({
			status: "success",
			message: "Users Succesfully Get",
			data: {
				products,
			},
	    });
	}catch (err) {
		console.log(err);
	    res.status(500).send({
	        status: "error",
	        message: "Server Error",
	    });
	}
}

exports.getDetailProduct = async (req, res) => {
	try{
		const {id} = req.params;
		const product = await Product.findOne({
			where: {
				id
			},
			include: [
				{	
					model: User,
					attributes:{
						exclude: ["createdAt", "updatedAt", "role", "password"]
					}
				}
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "userId", "UserId"]
			}
		});
		res.send({
			status: "success",
			message: "User Succesfully Get",
			data: {
				product,
			},
	    });
	} catch (err) {
		console.log(err);
	    res.status(500).send({
	        status: "error",
	        message: "Server Error",
	    });
	}
}

exports.addProduct = async (req, res) => {
	try{
		const { title, price, image, userId } = req.body

		const schema = Joi.object({
	      title: Joi.string().required(),
	      price: Joi.number().required(),
	    });

	    const { error } = schema.validate(req.body);

	    if (error)
	      return res.status(400).send({
	        status: "validation failed",
	        message: error.details[0].message,
	      });

		const postProduct = await Product.create({
			title: title,
			price: price,
			image: req.files.image[0].filename,
			userId: req.userId.id
		})
		
		const product = await Product.findOne({
			where: {
				id: postProduct.id
			},
			include:[
				{
					model: User,
					attributes: {
						exclude: ["createdAt", "updatedAt", "role", "password"]
					}
				}
			],
			attributes:{
				exclude: ["createdAt", "updatedAt", "userId", "UserId"]
			}
		});

		res.send({
			status: "success",
			message: "Users Succesfully Get",
			data: {
				product,
			},
	    });

	} catch (err) {
		console.log(err);
	    res.status(500).send({
	        status: "error",
	        message: "Server Error",
	    });
	}
}

exports.editProduct = async (req, res) => {
	try{
		const { id } = req.params
		const { body } = req

		const schema = Joi.object({
	      title: Joi.string().required(),
	      price: Joi.integer().required(),
	      image: Joi.required(),
	    });

	    const { error } = schema.validate(req.body);

	    if (error)
	      return res.status(400).send({
	        status: "validation failed",
	        message: error.details[0].message,
	      });

		const checkId = await Product.findOne({
	      where: {
	        id,
	      },
	    });

	    if (!checkId)
	      return res.send({
	        status: "success",
	        message: `Data with id: ${id} not found`,
	      });

		const updateProduct = await Product.update(body,{
			where: {
				id,
			}
		})

		const product = await Product.findOne({
			where: {
				id: id
			},
			include:[
				{
					model: User,
					attributes: {
						exclude: ["createdAt", "updatedAt", "role"]
					}
				}
			],
			attributes:{
				exclude: ["createdAt", "updatedAt", "userId", "UserId"]
			}
		});

		res.send({
			status: "success",
			message: "Users Succesfully Get",
			data: {
				product,
			},
	    });

	} catch (err) {
		console.log(err);
	    res.status(500).send({
	        status: "error",
	        message: "Server Error",
	    });
	}
}

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "Product Succesfully Delete",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};