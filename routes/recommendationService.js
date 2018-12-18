
var Express = require('express')
var app = Express();
var bodyParser = require("body-parser");
var axios = require('axios');


app.use(bodyParser.json());

var Account = require('./accounts.js');





app.get('/getRecommendations', function(req, res){
	var recommendObject = {}
	
    axios.get('http://localhost:3000/getAccounts').then(function(response){
    	
    	recommendObject.Recommendation1 = rec(response.data);
    	recommendObject.Recommendation2 = {lbgAccount : "LBG Club LLoyds Saver Account",interestRate : 0.6}

    	res.json(recommendObject);
    })
 

})

function rec(options){
 var recommend=[];
 var credits = options.filter(function(m){return m.Category == "Credit"})
 var debits = options.filter(function(m){return m.Category == "Debit"})

credits.sort(function(a, b){return a.Balance - b.Balance});
debits.sort(function(a, b){return b.Balance - a.Balance});

for (var i = 0 ; i< credits.length; i++) {
	for (var j = 0; j < debits.length; j++) {
		if(debits[j].Balance == 0){continue;}
		 if(credits[i].Balance <= debits[j].Balance){
			var a = {};
			a.payFrom = debits[j].Name;
			a.payTo = credits[i].Name;
			a.payAmount = credits[i].Balance;
			a.outStandingBalance = 0;
			recommend.push(a);
			debits[j].Balance = debits[j].Balance - credits[i].Balance;
			break;
		}
		else{
			var a = {};
			a.payFrom = debits[j].Name;
			a.payTo = credits[i].Name;
			a.payAmount = debits[j].Balance;
			a.outStandingBalance = credits[i].Balance - debits[j].Balance;
			recommend.push(a);	
			break;		
		}
	}
}
return recommend;	
    
}

app.listen(3002,function(){
    	console.log('Server started')
})
