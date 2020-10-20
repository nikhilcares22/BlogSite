let mongoose = require('mongoose');

const { url } = require('../config.js');
console.log(url)

//"mongodb+srv://nikhil:nehminilu@cluster0.udzon.mongodb.net/restful_blog_app?retryWrites=true&w=majority"//
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

//MONGOOSE MODEL CONFIG
var blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    body: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema)