let express = require('express'),
    app = express(),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    expressSanitizer = require('express-sanitizer'),
    blogRoutes = require('./routes/blogs'),
    indexRoutes = require('./routes/index');

const { port } = require('./config.js');

//APP CONFIG
app.set('view engine', "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
// METHOD OVERRIDING FOR PUT DELETE VERBS
app.use(methodOverride("_method"));
app.use(expressSanitizer());

app.use("/blogs", blogRoutes)
app.use("/", indexRoutes)


// app.listen(port, () => {
//     console.log(`listening at port ${port}`)
// });

app.listen(port, () => {
    console.log(`Server running at ${port}`)
});