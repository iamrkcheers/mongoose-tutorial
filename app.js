var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var book = require('./book.model')

var db = 'mongodb://localhost/example';

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

app.get('/',function(req,res){
    res.send('Welcome peeps !');
});

app.get('/books',function(req,res){
    console.log('Books Books Books !');
    book.find({}).exec(function(error,books){
        if (error)
            res.send('Error in finding books ..');
        else
            res.json(books);
            //res.send(JSON.stringify(books));
    });
});

app.get('/books/:id',function(req,res){
    console.log('Getting one book ..');
    book.findOne({
        _id : req.params.id
    }).exec(function(error,item){
        if (error)
            console.log('Nahi mili yrr ..');
        else{
            console.log('Got one book ..')
            res.json(item);
        }
    });
});

app.post('/books',function(req,res){
    var myBook = new book();
    myBook.title = req.body.title;
    myBook.author = req.body.author;
    myBook.category = req.body.category;
    myBook.save(function(error,data){
        if (error)
            res.send('Error has occurred ..');
        else
            res.send(data);
    });
});

app.post('/books2',function(req,res){
    book.create(req.body,function(error,data){
        if (error)
            res.send('Error has occurred ..');
        else
            res.send(data);
    });
});

app.put('/books/:id',function(req,res){
    book.findOneAndUpdate(
        {_id : req.params.id},
        {$set : {title : req.body.title}},
        {upsert : true},
        function(error,data){
            if (error)
                res.send('Error has occurred ..');
            else
                res.send(data);
        }
    );
});

app.delete('/books/:id',function(req,res){
    book.findOneAndRemove(
        {_id : req.params.id},
        function(error,data){
            if (error)
                res.send('There has been an error ..');
            else
                res.send(data);
        }
    );
});

app.listen(8080,function(){
    console.log('Server has started ..');
});