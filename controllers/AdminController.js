import Menu from "../models/Menu.js"
import response from "../response.js"
// import userLibrary from "../libraries/user.js"
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"
// import dotenv from 'dotenv'

class AdminController {
    async createMenu(req, res) {
        try {
            if (!req.body.name) { throw { code: 400, message: 'NAME_REQUIRED' } }
            if (!req.body.category) { throw { code: 400, message: 'CATEGORY_REQUIRED' } }
            if (!req.body.price) { throw { code: 400, message: 'PRICE_REQUIRED' } }
            
            //create menu
            const menu = await Menu.create({
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                image: req.body.image,
                description: req.body.description,
            })           
            
            //return data
            const data = {
                name: menu.name,
                category: menu.category,
                price: menu.price,
                image: menu.image,
                description: menu.description,
            }
            return res.status(201).json(response.responseSuccess(data, 'Create Menu Success', 1))
        } catch (error) {
            return res.status(error.code).json(response.responseFailed(error.message))
        }
    }

    async updateMenu(req, res) {
        try {
            if (!req.body.id) { throw { code: 400, message: 'ID_REQUIRED' } }
            if (!req.body.name) { throw { code: 400, message: 'NAME_REQUIRED' } }
            if (!req.body.category) { throw { code: 400, message: 'CATEGORY_REQUIRED' } }
            if (!req.body.price) { throw { code: 400, message: 'PRICE_REQUIRED' } }
            
            //create menu
            const menu = await Menu.updateOne({_id:req.body.id},{
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                image: req.body.image,
                description: req.body.description,
            })           
            
            //return data
            const data = []
            return res.status(200).json(response.responseSuccess(data, 'Update Menu Success', 1))
        } catch (error) {
            return res.status(error.code).json(response.responseFailed(error.message))
        }
    }

    async getAllMenu(req, res) {
        try {
            // if (!req.body.id) { throw { code: 400, message: 'ID_REQUIRED' } }
            // if (!req.body.name) { throw { code: 400, message: 'NAME_REQUIRED' } }
            // if (!req.body.category) { throw { code: 400, message: 'CATEGORY_REQUIRED' } }
            // if (!req.body.price) { throw { code: 400, message: 'PRICE_REQUIRED' } }
            
            //create menu
            const menu = await Menu.find()           
            
            //return data
            const data = menu
            return res.status(200).json(response.responseSuccess(data, 'Update Menu Success', menu.length))
        } catch (error) {
            return res.status(error.code).json(response.responseFailed(error.message))
        }
    }

    async deleteMenu(req, res) {
        try {
            console.log("req",req.query)
            if (!req.query.id) { throw { code: 400, message: 'ID_REQUIRED' } }           
            
            //create menu
            const menu = await Menu.deleteOne({_id:req.query.id})    
            
            //return data
            const data = []
            return res.status(204).json({})
        } catch (error) {
            return res.status(error.code).json(response.responseFailed(error.message))
        }
    }
}

export default new AdminController()