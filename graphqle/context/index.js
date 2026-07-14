import auth from "../../middleware/auth.js";
const context = async({req})=>{
const user = await auth(req);
 return {

        user

    };


};
export default context;