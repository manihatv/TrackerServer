var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var mongodb     =   require("./model/mongo");
var router      =   express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : true}));
//app.use(require('connect').bodyParser());
app.use('/',router);

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

router.get("/showusernames",function(req,res){
    var response = {};
    mongodb.find({},function(err,data){
        // Mongo command to fetch all data from collection.
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });
});


router.post("/addusernames",function(req,res) {
    var db = new mongodb();
    var uname = req.body.name;
    var response = {};
    console.log(req.body);
    db.username = req.body.name;
    console.log(req.body.name);

        db.save(function (err) {
            if (err) {

                if(err === 11000)
                {
                    console.log("dulicates");
                }

                response = {"error": true, "message": "Error adding data"};
            } else {
                response = {"error": false, "message": "Data added"};
            }
            res.json(response);
        });

});

app.listen(8082);
console.log("Listening to PORT 8082");