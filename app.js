var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
app.locals.pretty = true;
app.set('views','./views');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/topic/:id', function(req,res){
    var id = req.params.id;
    fs.readdir('data', function(err, files){
        if(err){ 
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        fs.readFile('data/'+id, 'utf8', function(err,data){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.render('view', {topics : files, title: id, description:data});
        });
    });
});

app.get('/topic', function(req,res){
    fs.readdir('data', function(err, files){
        if(err){ 
            console.log(err);
            res.status(500).send('/topic Internal Server Error');
        }
        //files에는 dir에 있는 파일들의 이름이 각각 배열로 담겨있다.
        res.render('view', {topics:files});
    });
});

app.post('/topic', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title, description, function(err){
        if(err){
            //오류가 있다는 것을 기계들에게 알려주는 숫자.
            console.log('doeun');
            console.log(err);
            res.status(500).send('/topic Internal Server Error');
        }else{
            res.send('Success');
        }
    });
});

app.get('/topic/new', function(req, res){
    console.log('topic/new is ok');
    res.render('new');
});

app.get('/', function(req, res){
    res.send('hi');
});

app.listen(3000, function(){
    console.log('Connected at 3000 port!!');
});