var express = require('express');
var app = express();
var config = require('./config')
var router = express.Router();
var jwt = require('jsonwebtoken');
var cors = require('cors')
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

//cors start
var originsWhitelist = [
    'http://localhost:4200', //this is front end url
    'http://www.xyz.com' //production url
    ];
    var corsOptions = {
    origin: function(origin, callback){
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
    },
    credentials:true
    }
    app.use(cors(corsOptions));
//cors end

var checkJWT = function (req, res, next) {
    
    console.log("==>inside jwt"+req.headers.token);
    if(req.headers.token != undefined ){
        console.log("token present");
    jwt.verify(req.headers.token, config.secret, function (err, data) {
        if (err) {
            res.json({
                status: false,
                message: err
            })
        }
        else {
            req.user = data;
            next();//move to next routing
        }

    })
}
else{
    console.log("token not present");
    res.json({
        status : false,
        message : "Token not present"
    })
}
}

router.post('/login', function (req, res) {
        if (req.body.email == "mohan@gmail.com" && req.body.pass == "12345") {
            const user = {
                name: "Mohan",
                age: 21,
                sal: 450,
                department: "Data science"
            }

            var token = jwt.sign(user, config.secret);
            res.json({
                status: true,
                token: token
            })
        }

    })

router.get('/products', checkJWT, function (req, res) {


                    res.json({
                        status: true,
                        products: [
                            {
                                name: "Apple",
                                cost: 450
                            },
                            {
                                name: "Banana",
                                cost: 500
                            }
                        ]
                    })

    })

router.get('/categories',checkJWT, function (req, res) {
        
                    res.json({
                        status: true,
                        products: [
                            {
                                name: "Fruits"
                            },
                            {
                                name: "Home Appliences"
                            }
                        ]
                    })
    })

app.use('/api', router);
    app.listen(config.port, function () {
        console.log('The server running on port number ' + config.port)
    })