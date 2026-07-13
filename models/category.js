import schema  from `mongoose`;
const { Schema } = schema;
const categorySchema = new Schema({
    name:{
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    slug:{
        type : String,
        required : true,
        unique : true,
        trim : true
    }
});
module.exports = schema.model("Category", categorySchema);