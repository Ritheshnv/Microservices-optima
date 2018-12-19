var express = require('express');
var bodyParser = require('body-parser');
var seneca = require('seneca')({ log: 'silent' });
var Web = require('seneca-web');
var router = express.Router();

var app = express(); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

seneca.use(Web, {context: app,adapter: require('seneca-web-adapter-express')
});

seneca.use('entity').use('mongo-store', {
    uri: 'mongodb://localhost:27017/mydb',
    options: { useNewUrlParser: true }
  });
 var account = seneca.make$('Account');
//   account.name= 'Halifax';
//   account.category= 'Debit';
//   account.type= 'SB';
//   account.balance= 2100;
//   account.rate=0.2;
//   account.save$(function(err, savedAccount){
//    if(err) return console.error(err);
//    console.log(savedAccount);
// });


seneca.add('role:account, cmd:getAccounts', function(args, done){
  
  account.list$(function(err, result){
    done(err, result);
  });
});

router.get('/', function(req, res){

  seneca.act({role: 'account', cmd: 'getAccounts'} , function(err, result){
    if(err){return console.error(err);}
    console.log(result);
    // var objres = JSON.parse(result);
    // console.log(objres);
     // result.forEach(function (acc) {
       // var obj = JSON.parse(acc);
     //  console.log(obj);
      // res.json(acc);
      res.render('accounts',{accDetails :result});
    });
  
});

seneca.add('role:account, cmd:getaccountByName', function(args, done){
  accountName = args.name;
  console.log('account name requested : ' + accountName);
  account.load$({name:accountName}, function(err, result){
    done(err, result);
  });
});

router.get('/account/:name', function(req, res){
  var accountName = req.params.name;
  seneca.act({role: 'account', cmd: 'getaccountByName',
  name:accountName} , function(err, result){
    if(err){return console.error(err);}
    // else {res.json({Name:result.name,Category:result.category,Type:result.type,Balance:result.balance,Rate:result.rate});}
    else{
      console.log(result);
      res.render('accounts',{accDetails :{Name:result.name,Category:result.category,Type:result.type,Balance:result.balance,Rate:result.rate}});
    }
  
});
});

seneca.add({role:'account', cmd:'create'}, function(args, done){
  account.name = args.name;
  account.category = args.category;
  account.type = args.type;
  account.balance = args.balance;
  account.rate = args.rate;
  account.save$(function(err, savedaccount){
    done(err, savedaccount);
  });
});

router.post('/account', function(req,res){
  var accountName = req.body.name;
  var accountCategory = req.body.category;
  var accountType = req.body.type;
  var accountBalance = req.body.balance;
  var accountRate = req.body.rate;
  seneca.act({role:'account', cmd:'create', name: accountName,category:accountCategory,type: accountType,balance: accountBalance,rate:accountRate}, function(err, result){
    if (err) {return console.error(err);}
    else{
      console.log(result);
      res.json({msg: 'new account added'})
    }
  })
});

seneca.add('role:payment, cmd:paymentServ', function(args, done){
  amount = args.amount;
  console.log('Amount transferred successfully : ' + amount);
  payment.load$({trId:transactionId}, function(err, result){
    done(err, result);
  });
});

module.exports = router;