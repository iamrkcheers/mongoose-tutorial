var mongoose = require('mongoose');
var schema = mongoose.Schema;
/*var bookSchema = new schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    keyword : Array,
    published : Boolean,
    author : {
        type : schema.objectId,
        ref : 'User'
    },
    details : {
        modelNumber : Number,
        hardCover : Boolean,
        reviews : Number,
        rank : Number
    }
});*/
var bookSchema = new schema({
    title : String,
    author : String,
    category : String
});
// schema.objectId or schema.type.objectId; 'User' is the name of the other model that we wd be referencing here
module.exports = mongoose.model('book',bookSchema);