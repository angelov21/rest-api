const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const ProductSchema = mongoose.Schema({
    _id: Number,
    name: String,
    category: String,
    price: String
}, { 
    _id: false, 
    versionKey: false
});

ProductSchema.plugin(autoIncrement, { id: 'product_seq', inc_field: '_id'});

module.exports = mongoose.model('Product', ProductSchema);