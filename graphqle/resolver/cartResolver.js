import Cart from "../../models/cart.js";


const cartResolver = {


    Query:{


        carts:async()=>{

            return await Cart.find()
                .populate("user")
                .populate("items.product");

        },


        cart:async(parent,args)=>{

            return await Cart.findById(args.id)
                .populate("user")
                .populate("items.product");

        },


        userCart:async(parent,args)=>{

            return await Cart.findOne({
                user:args.userId
            })
            .populate("items.product");

        }


    },



    Mutation:{


        createCart:async(parent,args)=>{


            const cart = new Cart({

                user:args.user,

                items:args.items

            });


            return await cart.save();


        },



        addToCart:async(parent,args)=>{


            const cart = await Cart.findOne({
                user:args.userId
            });



            if(!cart){

                const newCart = new Cart({

                    user:args.userId,

                    items:[
                        {
                            product:args.product,
                            quantity:args.quantity,
                            size:args.size,
                            color:args.color
                        }
                    ]

                });


                return await newCart.save();

            }



            cart.items.push({

                product:args.product,

                quantity:args.quantity,

                size:args.size,

                color:args.color

            });



            return await cart.save();


        },




        updateCartItem:async(parent,args)=>{


            const cart = await Cart.findById(args.cartId);



            const item = cart.items.id(args.itemId);



            item.quantity = args.quantity;


            await cart.save();


            return cart;


        },




        removeCartItem:async(parent,args)=>{


            const cart = await Cart.findById(args.cartId);



            cart.items = cart.items.filter(

                item=>item._id.toString() !== args.itemId

            );


            await cart.save();



            return cart;


        },




        deleteCart:async(parent,args)=>{


            return await Cart.findByIdAndDelete(args.id);


        }


    }


};


export default cartResolver;