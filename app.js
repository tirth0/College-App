const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Schema = mongoose.Schema;
const url = 'mongodb://Tirtharaj:pukai007@cluster0-shard-00-00-bljgb.mongodb.net:27017,cluster0-shard-00-01-bljgb.mongodb.net:27017,cluster0-shard-00-02-bljgb.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
//fire express
const app = express();

//set view engine
app.set('view engine', 'ejs');

app.use(express.static('.'));

//bodyParser
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

//making the database connection
mongoose.connect(url, {useNewUrlParser : true}, (err) =>{
    if (err){
        console.log(err);
        return;
    }
    console.log('connection established');
});
var blog = mongoose.model('blog', new Schema({ title : String, details : String}));
// mongoose.connect(url, {useNewUrlParser : true}, (err) =>{
//     if (err){
//         console.log(err);
//         return;
//     }
//     console.log('connection established');
// })

//Routes
app.get('/', (req,res)=>{
    blog.find((err, myData)=>{
        //console.log(myData);
        res.render('home', { myData : myData });
    })
});

app.post('/home',urlencodedParser, (req,res) => {
    var newPost = new blog(req.body);
    newPost.save((err , data) => {
        if (err) throw err;
        console.log('data saved');
        res.redirect('/');
    });
});
//listen
app.listen(3000);