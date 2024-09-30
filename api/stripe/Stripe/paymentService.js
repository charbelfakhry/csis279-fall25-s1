const { isValidAmount } = require('./utils');

class PaymentService {
  constructor(stripeInstance) {
    this.stripe = stripeInstance;
  }

  // Create a payment intent
  async createPaymentIntent({ amount, currency, customerId, paymentMethod, returnUrl }) {
    try {


      // check if the amount is valid
      if (!isValidAmount(amount)) {
        throw new Error('Invalid amount');
      }


      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        customer: customerId,
        payment_method: paymentMethod,
        confirm: true, // Automatically confirm the payment
        return_url: returnUrl,
      });
      return paymentIntent;
    } catch (error) {
      throw new Error(`Error creating payment intent: ${error.message}`);
    }
  }

  // Refund a payment
  async refundPayment(paymentIntentId) {
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
      });
      return refund;
    } catch (error) {
      throw new Error(`Error creating refund: ${error.message}`);
    }
  }
}

module.exports = PaymentService;