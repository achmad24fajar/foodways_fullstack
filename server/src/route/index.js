const express = require('express');

const router = express.Router();

const {getUsers, deleteUser, getUsersByPartner, getUsersBySlug} = require('../controller/UserController');
const {getProducts, getProductsByUser, getDetailProduct, addProduct, editProduct, deleteProduct} = require('../controller/ProductController');
const {registerUser, loginUser, checkAuth} = require('../controller/AuthController');
const {uploadFile} = require("../middlewares/upload");
const {authenticated} = require("../middlewares/auth");
const {checkRolePartner, checkRoleUser} = require("../middlewares/checkRole");
const {getTransactions, getDetailTransactions, addTransactions, editTransactions, deleteTransaction, myTransactions} = require("../controller/TransactionController");

router.get('/users', getUsers);
router.get('/users/:role', getUsersByPartner);
router.get('/user/:slug', getUsersBySlug);
router.delete('/users/:id', deleteUser);

router.get('/products/:id', getProducts);
router.post('/product', authenticated, checkRolePartner, uploadFile("image", ""), addProduct);
router.patch('/product/:id', uploadFile("image", ""), editProduct);
router.delete('/product/:id', authenticated, checkRolePartner, deleteProduct);
router.get('/products', authenticated, getProductsByUser);
router.get('/product/:id', authenticated, getDetailProduct);

router.get('/transactions', authenticated, checkRolePartner, getTransactions)
router.get('/transaction/:id', authenticated, checkRolePartner, getDetailTransactions)
router.post('/transaction', authenticated, checkRoleUser, addTransactions)
router.patch('/transaction/:id', authenticated, checkRolePartner, editTransactions)
router.delete('/transaction/:id', authenticated, checkRoleUser, deleteTransaction)
router.get('/my-transactions', authenticated, checkRoleUser, myTransactions)

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/check-auth', authenticated, checkAuth)

module.exports = router