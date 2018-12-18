var stripe = require('stripe')('sk_test_cOwzte92kN0aGAPN8t0bpxYt');


// stripe.transfers.create({
//     amount: 400,
//     currency: "usd",
//     destination: "acct_1032D82eZvKYlo2C",
//     transfer_group: "ORDER_95"
//   }, function(err, transfer) {
//     // asynchronously called
//   });


  stripe.accounts.create({
    type: 'custom',
    country: 'US',
    email: 'bob@example.com'
  }, function(err, account) {
    // asynchronously called
    if(!err){
        console.log(account);
    }
    else {
        console.log(err);
    }
  });