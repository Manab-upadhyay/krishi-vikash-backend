

import express from "express"
import auth from "../auth/authcontroller.js";
const router= express.Router()

const authcontroller= new auth()

router.post("/signup",  (req, res) =>authcontroller.Singup(req,res));
router.post("/login", (req, res) => authcontroller.loginFarmer(req,res));
router.post("/logout",  (req, res) =>authcontroller.Logout(req,res));


export default router

