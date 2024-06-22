import express from "express";
import AuthController from "../controllers/AuthController.js"


const router = express.Router()

router.post('/register', AuthController.register)
router.get('/fetch', AuthController.fetch)

 export default router