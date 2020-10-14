let express = require('express'),
    router = express.Router(),
    Blog = require('../models/blog');

//INDEX ROUTE
router.get('/', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { blogs: blogs });

        }
    })

});

//NEW ROUTE
router.get('/new', (req, res) => {
    res.render('blogs/new');
});

//CREATE ROUTE
router.post('/', (req, res) => {
    // create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) {
            res.render('blogs/new');
        } else {
            //then redirect to index 
            res.redirect('/blogs')
        }
    })
});

//SHOW ROUTE
router.get('/:id', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render('blogs/show', { blog: foundBlog });
        }
    })

});

//EDIT ROUTE ---shows a form to update/edit the previous information
router.get('/:id/edit', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render('blogs/edit', { blog: foundBlog });
        }
    });

})

//UPDATE ROUTE
router.put('/:id', (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.redirect(`/blogs/${req.params.id}`);
        }
    });
});

//DELETE ROUTE
router.delete('/:id', (req, res) => {
    //destroy blog 
    req.params.id
    Blog.findByIdAndDelete(req.params.id, (err) => {
            if (err) {
                res.redirect('/blogs');
            } else {
                res.redirect('/blogs');
            }
        })
        //redirect somewhere

});

//confirmation page -yes or no
router.get('/:id/confirmation', (req, res) => {
    res.render('blogs/confirmation', { id: req.params.id });
});



module.exports = router;