import express from "express"
import { activateUser, deleteUser, getAllUSers, getUserInfo, loginUser, logoutUser, registrationUser, updateAccessToken, socialAuth, updatePassword, updateProfilePicture, updateUserInfo, updateUserRole} from "../controllers/user.controller.js"
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post('/registration', registrationUser)
userRouter.post('/activate-user', activateUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout', updateAccessToken, isAuthenticated, logoutUser)
userRouter.get('/refresh', updateAccessToken)
userRouter.get('/me', updateAccessToken, isAuthenticated, getUserInfo)
userRouter.post('/social-auth', socialAuth)
userRouter.put('/update-user-info', updateAccessToken, isAuthenticated, updateUserInfo)
userRouter.put('/update-user-password', updateAccessToken, isAuthenticated, updatePassword)
userRouter.put('/update-user-avatar', updateAccessToken, isAuthenticated, updateProfilePicture)
userRouter.get('/get-users', updateAccessToken, isAuthenticated, authorizeRoles("admin"), getAllUSers)
userRouter.put('/update-user-role', updateAccessToken, isAuthenticated, authorizeRoles("admin"), updateUserRole)
userRouter.delete('/delete-user/:id', updateAccessToken, isAuthenticated, authorizeRoles("admin"), deleteUser)

export default userRouter
