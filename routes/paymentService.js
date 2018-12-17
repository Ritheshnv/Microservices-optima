var stripe = require('stripe')()


stripe.transfers.create({
    amount: 400,
    currency: "usd",
    destination: "acct_1032D82eZvKYlo2C",
    transfer_group: "ORDER_95"
  }, function(err, transfer) {
    // asynchronously called
  });