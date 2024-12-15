const captainController = require("../controllers/captain.controller");
const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/register', [    //for validation of data
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage ('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage ('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage  ('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isNumeric().withMessage  ('Capacity must be a number'),
    body('vehicle.vechicleType').isIn(['car', 'motorcycle', 'auto']).withMessage  ('Vechicle type must be car, motorcycle or auto'),
],
captainController.createCaptain   //to get directly access to the function from user.controller
)

router.post('/login', [    //for validation of data
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],
captainController.loginCaptain   //to get directly access to the function from user.controller
)
 
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);   //to get directly access to the function from user.controller

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);  //

module.exports = router;