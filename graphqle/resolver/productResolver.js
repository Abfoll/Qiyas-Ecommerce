import Product from "../../models/product.js";


const productResolver = {

    Query: {

        products: async () => {
            return await Product.find()
            .populate("category");
        },


        product: async (parent, args) => {
            return await Product.findById(args.id)
             .populate("category");;
        }

    },
     Mutation: { createProduct: async (parent, args) => {

            const product = new Product({

    name:args.name,

    description:args.description,

    price:args.price,

    images:args.images,

    category:args.category,

    gender:args.gender,

    variants:args.variants,

    featured:args.featured

});
            return await product.save();

      },
        deleteProduct: async (parent, args) => {

            return await Product.findByIdAndDelete(args.id);
        },
        updateProduct: async (parent, args) => {

            return await Product.findByIdAndUpdate(
                args.id,

                {
                    name: args.name,
                    description: args.description,
                    price: args.price,
                    gender: args.gender,
                    featured: args.featured
                },

                {
                    new: true
                }

            );

        }

    }

};
export default productResolver;