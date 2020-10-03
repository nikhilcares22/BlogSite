let express = require('express'),
    app = express(),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    port = 3000;

mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

//APP CONFIG
app.set('view engine', "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
// METHOD OVERRIDING FOR PUT DELETE VERBS
app.use(methodOverride("_method"));

//MONGOOSE MODEL CONFIG
var blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    body: String,
    created: { type: Date, default: Date.now }
});

var Blog = mongoose.model('Blog', blogSchema)


//REST ROUTES
app.get('/', (req, res) => {
    res.redirect('/blogs')
});

//INDEX ROUTE
app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { blogs: blogs });

        }
    })

});

//NEW ROUTE
app.get('/blogs/new', (req, res) => {
    res.render('new');
});
//CREATE ROUTE
app.post('/blogs', (req, res) => {
    // create blog
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) {
            res.render('new');
        } else {
            //then redirect to index 
            res.redirect('/blogs')
        }
    })
});

//SHOW ROUTE
app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render('show', { blog: foundBlog });
        }
    })

});

//EDIT ROUTE ---shows a form to update/edit the previous information
app.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render('edit', { blog: foundBlog });
        }
    });

})

//UPDATE ROUTE
app.put('/blogs/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.redirect(`/blogs/${req.params.id}`);
        }
    })
});

app.listen(port, () => {
    console.log(`listening at port ${port}`)
});