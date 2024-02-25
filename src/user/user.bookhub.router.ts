import { Router } from "express";
import { UserAuthController } from "./controller/uesr.bookhub.auth.controller";
import { UserRefreshTokenController } from "./controller/user.bookhub.refresh.controller";
import { validateSignupInput, validateLoginInput } from "./validation/user.bookhub.auth.validation";
import { validateUserRefreshTokenInput, validateUserLogout, } from "./validation/user.boothub.refresh.validation";


// Create an instance of the Express router
const router: Router = Router();

// Instantiate controllers
const userAuthController = new UserAuthController();
const userRefreshTokenController = new UserRefreshTokenController();

// User authentication routes
router.post('/signup', validateSignupInput, userAuthController.registerUserBookHub);
router.post('/login', validateLoginInput, userAuthController.loginUserBookHub);


// User Refresh Token routes
router.post('/refresh-token',validateUserRefreshTokenInput, userRefreshTokenController.userRefreshToken);
router.delete('/logout',validateUserLogout, userRefreshTokenController.logoutUser);


export default router;


