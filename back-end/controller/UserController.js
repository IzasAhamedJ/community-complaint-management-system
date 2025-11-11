import User from "../models/user.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'


export const registration = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            phone
        } = req.body;


        const userExists = await User.findOne({ email });

        const phoneNumber = await User.findOne({ phone })

        if (phoneNumber) {
            return res.status(400).json({ msg: 'User with this Mobile Number already exists' });
        }
        if (userExists) {
            return res.status(400).json({ msg: 'User with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            phone,
            password: hashedPassword
        })

        res.status(200).json({
            message: 'User Registerd Successfully',
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }

}


export const login = async (req, res) => {
    try {
        const { password, email } = req.body;

        const createdUser = await User.findOne({ email });

        if (!createdUser) {
            res.status(401).json({
                message: 'Invalid credentials. Please check your email.',
                success: false
            })
        }



        const isMatch = await bcrypt.compare(password, createdUser.password);
        if (!isMatch) {
              res.status(401).json({
                success: false,
                message: "Invalid credentials. Please check your password.",
            });
        }

        const token = jwt.sign(
            {
                id: createdUser._id,
                email: createdUser.email
            },
            process.env.JWT_KEY,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                _id: createdUser._id,
                username: createdUser.username,
                email: createdUser.email,
                phone: createdUser.phone,
                role:createdUser.role
            },
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


export const getUser = async (req, res) => {
    try {
        const allUser = await User.find({}, { password: 0 });

        res.status(200).json({
            data: allUser,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const roleUpdate = async (req, res) => {
    try {
        const { id } = req.params;

        const userData = await User.findByIdAndUpdate(id, {
            role: 'committee'
        }, { new: true })



        res.status(200).json({
            message: 'Role Updated Successfully',
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}