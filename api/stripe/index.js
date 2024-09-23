const StripeService = require("./Stripe/stripeService")
const dotenv = require('dotenv');
dotenv.config();

// Initialize the Stripe service
const stripeService = new StripeService(process.env.STRIPE_SECRET_KEY);

// Create a customer
async function createCustomerExample() {
  try {
    const customer = await stripeService.customers.createCustomer({
      email: 'noujaimjimmy61@gmail.com',
      name: 'Test User',
      paymentMethod: 'pm_card_visa',
    });
    console.log('Customer created:', customer);
  } catch (error) {
    console.error(error.message);
  }
}

// Update a customer
async function updateCustomerExample() {
  try {
    const updatedCustomer = await stripeService.customers.updateCustomer('cus_123456789', {
      name: 'Updated Name',
    });
    console.log('Customer updated:', updatedCustomer);
  } catch (error) {
    console.error(error.message);
  }
}

// Delete a customer
async function deleteCustomerExample() {
  try {
    const deletedCustomer = await stripeService.customers.deleteCustomer('cus_123456789');
    console.log('Customer deleted:', deletedCustomer);
  } catch (error) {
    console.error(error.message);
  }
}

// Example: Create Payment Intent
async function createPaymentIntentExample(customerId) {
  try {
    const paymentIntent = await stripeService.payments.createPaymentIntent({
      amount: 5000,
      currency: 'usd',
      customerId,
      paymentMethod: 'pm_card_visa',
      returnUrl: "http://localhost:3000"
    });
    console.log('Payment Intent created:', paymentIntent);
  } catch (error) {
    console.error(error.message);
  }
}

// Call any function you need
// createCustomerExample();
createPaymentIntentExample("cus_Qtyua0repWgAy3");
