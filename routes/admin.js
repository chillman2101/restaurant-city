import express from "express";
import AdminController from "../controllers/AdminController.js"
import jwtAuth from "../middlewares/jwtAuth.js";


const router = express.Router()

router.post('/create-menu', jwtAuth(),AdminController.createMenu)
router.put('/update-menu', jwtAuth(),AdminController.updateMenu)
router.delete('/delete-menu', jwtAuth(),AdminController.deleteMenu)
router.get('/menu', jwtAuth(),AdminController.getAllMenu)


 export default router