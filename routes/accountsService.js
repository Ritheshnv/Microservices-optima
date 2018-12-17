
var Express = require('express')
var app = Express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydb', function(){
	console.log("DB is connected");
});

var Account = require('./account.js');

app.get('/', function(req, res){
	res.send('main endpoint')
})

app.post('/account', function(req, res){
     var newAccount = {
  Name : req.body.Name ,
  Category : req.body.Category,
  Type: req.body.Type,
  Balance: req.body.Balance,
  Rate:req.body.Rate
}

var account = new Account(newAccount);

account.save(function(err){
	if(err) return handleError(err);
});

res.send('account created');

})

app.get('/getAccounts', function(req, res){
	Account.find(function (err, accounts) {
  if (err) return handleError(err);
  // 'athletes' contains the list of athletes that match the criteria.
  res.json(accounts)
})
})

app.get('/account/:name',function(req,res){
	Account.find({'Name': req.params.name}, function(err, account){
		res.send(account);
	})
})

app.delete('/account/:name',function(req,res){
	Account.findOneAndRemove(req.params.name, function(err){
		res.send("deleted success")
	})
})
app.listen(3000,function(){
    	console.log('Server started')
})
