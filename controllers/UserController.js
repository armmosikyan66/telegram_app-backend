import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/UserModel";

class UserController {
    async createUser(req, res) {
        try {
            const error = validationResult(req);
            const {username, email, password} = req.body;

            if (!error.isEmpty()) {
                res.status(400).json({message: "Incorrect request", error});
            }

            const userExists = await UserModel.findOne({username, email});

            if (userExists) {
                res.status(400).json({message: `User with username ${username} or email ${email} already exists`});
            }

            const hashedPassword = await bcrypt.hash(password, 8)

            const user = await UserModel.create({email, username, password: hashedPassword});

            res.status(201).json({user});
        } catch (e) {
            res.status(400);
        }
    }

    async login(req, res) {
        try {

            const {email, password} = req.body;

            const user = await UserModel.findOne({email});

            if (!user) {
                throw new Error("User not found");
            }

            const isPassValid = await bcrypt.compareSync(password, user.password);

            if (!isPassValid) {
                throw new Error("Invalid Password");
            }

            const token = await jwt.sign({id: user.id}, `123456789012`, {expiresIn: "30d"});

            return res.json({
                token,
                user
            });
        } catch (e) {
            res.status(404).json({message: `Error: ${e}`});
        }
    }

    async isAuth(req, res) {
        try {
            const user = await UserModel.findOne({_id: req.user.id});
            const token = await jwt.sign({id: user.id}, `123456789012`, {expiresIn: "30d"});

            res.status(200).json({
                token,
                user
            })
        } catch (e) {
            console.log(e);
            res.json({message: "server error"});
        }
    }

    async getUsers(req, res) {
        try {
            const users = await UserModel.find({}).exec();

            res.send(users);
        } catch (e) {
            console.log(e);
            res.json({message: "server error"});
        }
    }
}

export default new UserController();