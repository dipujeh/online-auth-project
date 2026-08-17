import jwt from "jsonwebtoken";

const verifyToken = (req,res,next)=>{
    try {
        
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                "message":"unauthorized user"
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);

        req.userId = decoded.userId; 
          
        next();
    } catch (error) {
        res.status(500).json({"message":"internal server error"})
    }
}

export default verifyToken;