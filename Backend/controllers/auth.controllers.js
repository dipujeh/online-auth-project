import generateToken from "../config/token.js";
import User from "../models/user.models.js";
import tokenVerify from "../middleware/tokenVerify.js";



import bcrypt from "bcrypt";
import uploadCloud from "../config/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, course, email, password } = req.body;

    console.log(req.file);

    // Check profile image
    if (!req.file) {
      return res.status(400).json({
        message: "Profile image is required",
      });
    }

    // Upload image to Cloudinary
    const cloudUrl = await uploadCloud(req.file.path);
    console.log(cloudUrl);

    // Check email
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      course,
      email,
      password: hashPassword,
      profileImg: cloudUrl,
    });

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Signup successfully",
      user: {
        firstName,
        lastName,
        course,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// login

export const login = async(req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await User.findOne({ email });


    if (!existUser) {
      return res.status(400).json({
        message: "user does not exist",
      });
    }

    const match = await bcrypt.compare(password, existUser.password);

    if (!match) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    // generate token

    const token = generateToken(existUser._id);

    // parse cookie

    res.cookie("token",token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==="production",
      sameSite:"lax",
      maxAge:7*24*60*60*1000
    })


    // const {firstName,lastName,course,email,profileImg} = existUser

    res.status(200).json({
      message: "Login Successfully",
      user: {
        firstName:existUser.firstName,
        lastName:existUser.lastName,
        course:existUser.course,
        email:existUser.email,
        profileImg:existUser.profileImg,
      },
    });
  } catch (error) {
    res.status(500).json({
      message:"internal server error",
      error:error.message
    })
  }
};


// logout auth


export const logout = async(req,res)=>{
  try {
      res.clearCookie("token",{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"lax"
      })

      res.status(200).json({
        "message":"Logout successfully"
      })
  } catch (error) {
    res.status(500).json({
      "message":"Internal server error",
      "error":error.message
    })
  }
}


// getdata

export const getData = async (req,res)=>{
  try {
    const userId = req.userId;
    if(!userId){
      return res.json({
        "message":"user id is not found"
      });
    }
    let user = await User.findById(userId)

    res.status(200).json(user)
    // console.log(user);
    
  } catch (error) {
    res.status(500).json({"message":"Intenal server error"})
    
  }
}

