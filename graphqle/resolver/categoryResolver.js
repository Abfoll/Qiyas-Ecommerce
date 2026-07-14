import Category from "../../models/category.js";


const categoryResolver = {


    Query:{


        categories:async()=>{

            return await Category.find();

        },


        category:async(parent,args)=>{

            return await Category.findById(args.id);

        }


    },



    Mutation:{


        createCategory:async(parent,args)=>{


            const category = new Category({

                name:args.name,

                description:args.description,

                image:args.image

            });


            return await category.save();


        },
updateCategory:async(parent,args)=>{


            return await Category.findByIdAndUpdate(

                args.id,

                {

                    name:args.name,

                    description:args.description,

                    image:args.image

                },


                {
                    new:true
                }

            );


        },



        deleteCategory:async(parent,args)=>{


            return await Category.findByIdAndDelete(

                args.id

            );


        }


    }


};
export default categoryResolver;