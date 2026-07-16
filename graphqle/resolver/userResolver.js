import User from "../../models/user.js";
import bcrypt from "bcrypt";
import generateToken from "../../utils/generateToken.js";

const userResolver = {

    Query:{

        users: async()=>{

            return await User.find();

        },


        user: async(parent,args)=>{

            return await User.findById(args.id);

        }

    },


    Mutation:{


      loginUser: async(parent,args)=>{

    try{

        console.log("LOGIN ARGS:",args);


        const user = await User.findOne({
            email:args.email
        });


        console.log("FOUND USER:",user);


        if(!user){

            throw new Error("User not found");

        }
        const isMatch = await bcrypt.compare(
            args.password,
            user.password
        );
        if(!isMatch){
            throw new error("invalid password");
        }
        console.log("PASSWORD MATCH:",isMatch);



        const token = generateToken(user);


        console.log("TOKEN:",token);



        return {

        token,

            user
};
    }catch(error){

        console.log("LOGIN ERROR:",error);

        throw new Error(error.message);

    }

},

        createUser: async(parent,args)=>{


            try{  console.log("ARGS:",args);


                const hashedPassword = await bcrypt.hash(
                    args.password,
                    10
                );


                const user = new User({

                    name:args.name,

                    email:args.email,

                    password:hashedPassword

                });



                const savedUser = await user.save();


                console.log("SAVED:",savedUser);


                return savedUser;


            }catch(error){

                console.log(error);

                throw new Error(error.message);

            }


        },



        updateUser: async(parent,args)=>{


            return await User.findByIdAndUpdate(

                args.id,

                {

                    name:args.name,

                    email:args.email

                },

                {
                    new:true
                }

            );


        },



        deleteUser: async(parent,args)=>{


            return await User.findByIdAndDelete(

                args.id

            );


        }


    }

};


export default userResolver;