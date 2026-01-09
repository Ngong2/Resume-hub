import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";

// generate JWT token
const generateToken = (userId) => {
    const secret = process.env.JWT_SECRET || 'dev-secret';
    return jwt.sign({ id: userId }, secret, { expiresIn: "7d" });
}

// POST: /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: passwordHash });
        await newUser.save();

        const token = generateToken(newUser._id);
        newUser.password = undefined;

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: newUser
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already in use" });
        }
        console.error('registerUser error', error);
        return res.status(500).json({ message: "Error registering user", error: error.message });
    }
}

// POST: /api/users/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "invalid email or password" });

        const token = generateToken(user._id);
        user.password = undefined;

        return res.status(200).json({ message: "login successfully", token, user });

    } catch (error) {
        console.error('loginUser error', error);
        return res.status(500).json({ message: "Error login", error: error.message });
    }
}

// GET /api/users/data
export const getUserId = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) return res.status(400).json({ message: "Missing user ID" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.password = undefined;
        return res.status(200).json({ user });

    } catch (error) {
        return res.status(400).json({ message: "Error fetching user", error: error.message });
    }
}

// GET /api/users/resumes
export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId;
        const resumes = await Resume.find({ userId: userId });
        return res.status(200).json({ resumes });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
