const express = require("express");
const router = express.Router();
const { isLoggedIn, checkIfLoggedIn } = require("../middlewares/isLoggedIn");

const { 
    getProducts, 
    loginPage,
    getProduct,
    cartPage,
    checkoutPage,
    orderSuccess,
    ownerLoginPage,
    termsofService,
    privacyPolicy
} = require("../controllers/indexController");


router.get("/", getProducts);

router.get('/login', checkIfLoggedIn, loginPage);

router.get('/cart', isLoggedIn, cartPage);

router.get('/checkout', isLoggedIn, checkoutPage);

router.get('/order-success', isLoggedIn, orderSuccess);

router.get('/owner-login', ownerLoginPage)

router.get('/termsofservice', termsofService)

router.get('/privacypolicy', privacyPolicy)

router.get('/:id', isLoggedIn, getProduct);

module.exports = router;