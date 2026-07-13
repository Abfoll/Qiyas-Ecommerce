import User from "../../models/user.js";


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


        createUser: async(parent,args)=>{


            const user = new User({

                name:args.name,

                email:args.email,

                password:args.password,

                phone:args.phone

            });


            return await user.save();


        },



        updateUser: async(parent,args)=>{


            return await User.findByIdAndUpdate(

                args.id,

                {

                    name:args.name,

                    phone:args.phone

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