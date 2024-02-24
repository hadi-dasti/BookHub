import {Router} from "express"
import { AdminController } from "./controller/admin.bookhub.controller";


const adminController = new AdminController();
const router: Router = Router();

router.post("/create", adminController.createAdmin);


export default router;