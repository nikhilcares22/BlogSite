let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    port = 3000;

mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true, useUnifiedTopology: true });

//APP CONFIG
app.set('view engine', "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//MONGOOSE MODEL CONFIG
var blogSchema = mongoose.Schema({
    title: String,
    image: { type: String },
    body: String,
    created: { type: Date, default: Date.now }
});

var Blog = mongoose.model('Blog', blogSchema)


//REST ROUTES
app.get('/', (req, res) => {
    res.redirect('/blogs')
});
app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { blogs: blogs });

        }
    })

});

app.listen(port, () => {
    console.log(`listening at port ${port}`)
});