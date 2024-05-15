import   express  from 'express';
import {LoginUser} from "../controllers/UserController.js"
import {RegisterUser} from "../controllers/UserController.js"


const userRouter = express.Router();


userRouter.post("/register", RegisterUser);
userRouter.post("/login", LoginUser);

export default userRouter ;
