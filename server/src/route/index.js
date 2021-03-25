const express = require('express');

const router = express.Router();

const {getUsers, deleteUser} = require('../controller/UserController');
const {getProducts, getProductsByUser, getDetailProduct, addProduct, editProduct, deleteProduct} = require('../controller/ProductController');
const {registerUser, loginUser} = require('../controller/AuthController');
const {uploadFile} = require("../middlewares/upload");
const {authenticated} = require("../middlewares/auth");
const {checkRolePartner, checkRoleUser} = require("../middlewares/checkRole");
const {getTransactions, getDetailTransactions, addTransactions, editTransactions, deleteTransaction, myTransactions} = require("../controller/TransactionController");

router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

router.get('/products', authenticated, checkRolePartner, getProducts);
router.post('/product', authenticated, checkRolePartner, uploadFile("image", ""), addProduct);
router.patch('/product/:id', authenticated, checkRolePartner, uploadFile("image", ""), editProduct);
router.delete('/product/:id', authenticated, checkRolePartner, deleteProduct);
router.get('/products/:id', authenticated, getProductsByUser);
router.get('/product/:id', authenticated, getDetailProduct);

router.get('/transactions', authenticated, checkRolePartner, getTransactions)
router.get('/transaction/:id', authenticated, checkRolePartner, getDetailTransactions)
router.post('/transaction/', authenticated, checkRoleUser, addTransactions)
router.patch('/transaction/:id', authenticated, checkRolePartner, editTransactions)
router.delete('/transaction/:id', authenticated, checkRoleUser, deleteTransaction)
router.get('/my-transactions', authenticated, checkRoleUser, myTransactions)

router.post('/register', uploadFile("image", ""), registerUser);
router.post('/login', loginUser);

module.exports = router