
var Express = require('express')
var app = Express();
var bodyParser = require("body-parser");
var path = require('path');
var url = require('url');
var mongoose = require('mongoose');
var fs = require('fs');

var lib = {};

app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/mydb', function(){
// 	console.log("DB is connected");
// });

lib.baseDir = path.join(__dirname, '../.data/');

lib.mediData = [];

var Account = require('./accounts.js');

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

let dir = 'test';
let file =  'newFile';

//function(dir, file, dataToWrite, console.log) {
    //open the file for writing
    if (fs.existsSync(lib.baseDir + dir + '/' + file + '.json')) {
        //convert data to string

        fs
            .readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function (err, data) {
				console.log(data);
                if (data.length == 0) {
                    data.push(account);
                    var stringData = JSON.stringify(data);
                    fs.writeFile(lib.baseDir + dir + '/' + file + '.json', stringData, function (err) {
                        if (!err) {
                            console.log('Successfully written to file');
                        } else {
                            console.log('Error writing to new file');
                        }
                    });
                    console.log(err, data);
                } else {
                    var parsedData = JSON.parse(data);
                    var found = parsedData.some(function (el) {
                        return el._id === account._id;
                    });
                    if (!found) {
                        //dataToWrite.Id = lib.getId(parsedData.length + 1);
                        parsedData.push(account);
                        var stringData = JSON.stringify(parsedData);
                        fs.writeFile(lib.baseDir + dir + '/' + file + '.json', stringData, function (err) {
                            if (!err) {
                                console.log('Successfully written to file');
                            } else {
                                console.log('Error writing to new file');
                            }
                        });
                    } else {
                        console.log('Medicine already exists');
                    }
                }
            });
    } else {
        fs
            .open(lib.baseDir + dir + '/' + file + '.json', 'wx', function (err, fileDescriptor) {
                if (!err && fileDescriptor) {
                    //convert data to string
                    //dataToWrite.Id = lib.getId(1);
                    lib
                        .mediData
                        .push(account);
                    var stringData = JSON.stringify(lib.mediData);

                    //write to file and close it
                    fs.writeFile(fileDescriptor, stringData, function (err) {
                        if (!err) {
                            fs
                                .close(fileDescriptor, function (err) {
                                    if (!err) {
                                        console.log('Successfully written to file');
                                    } else {
                                        console.log('Error while closing the file');
                                    }
                                });
                        } else {
                            console.log('Error writing to new file');
                        }
                    });
                } else {
                    console.log('Could not create new file, it may already exist');
                }
            });
	}
	res.send('account created');
})

app.get('/getAccounts', function(req, res){

	let dir = 'test';
	let file =  'newFile';

	fs
	.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function (err, data) {
		if(!err)
		{
			console.log(data);
			res.json(JSON.parse(data));
		}
		else
		{console.log(err);}
	});

// 	Account.find(function (err, accounts) {
//   if (err) return handleError(err);
//   // 'athletes' contains the list of athletes that match the criteria.
//})
})

app.get('/account/:name',function(req,res){
	
	let dir = 'test';
	let file =  'newFile';

	var required_name = req.params.name;
	
	fs
	.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function (err, data) {
		var requiredData = JSON.parse(data).filter(function (item) {
			return item.Name === required_name
		})
		console.log(requiredData);
		res.send(requiredData);
	});
	
	//console.log(req.params.name);
	// Account.find({'Name': req.params.name}, function(err, account){
	// 	res.send(account);
	// })

})

app.delete('/account/:name',function(req,res){

	let dir = 'test';
	let file =  'newFile';

	var required_name = req.params.name;

	fs
	.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function (err, data) {
		var requiredData = JSON.parse(data).filter(function (item) {
			return item.Name !== required_name
		})
		var stringData = JSON.stringify(requiredData);
		fs.writeFile(lib.baseDir + dir + '/' + file + '.json', stringData, function (err) {
			if (!err) {
				console.log('Successfully deleted from file');
			} else {
				console.log('Error writing to new file');
			}
		});
	});

	// Account.findOneAndRemove(req.params.name, function(err){
		res.send("deleted success")
	// })
})
app.listen(3000,function(){
    	console.log('Server started')
})
