import jwt from "jsonwebtoken";
import User from "../models/user.js";


const auth = async(req)=>{

    const header = req.headers.authorization;


    if(!header){
        return null;
    }


    try{

        const token = header.split(" ")[1];


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        const user = await User.findById(decoded.id);


        return user;


    }catch(error){

        return null;

    }

};


export default auth;