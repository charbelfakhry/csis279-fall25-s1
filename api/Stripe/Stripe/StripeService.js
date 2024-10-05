const Stripe = require('Stripe');
const CustomerService = require('./customerService');
const PaymentService = require('./paymentService');

class StripeService {
  constructor(secretKey) {
    this.stripe = new Stripe(secretKey);

    this.customers = new CustomerService(this.stripe);
    this.payments = new PaymentService(this.stripe);
  }
}


module.exports = StripeService;