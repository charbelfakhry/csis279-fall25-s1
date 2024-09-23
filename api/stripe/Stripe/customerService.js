const { isEmailValid } = require('./utils');

class CustomerService {
  constructor(stripeInstance) {
    this.stripe = stripeInstance;
  }

  // Create a new customer
  async createCustomer({ email, name, paymentMethod }) {

    try {
      // check if email is valid 
      if (!isEmailValid(email)) {
        throw new Error('Invalid email');
      }

      const customer = await this.stripe.customers.create({
        email,
        name,
        payment_method: paymentMethod,
      });
      return customer;
    } catch (error) {
      throw new Error(`Error creating customer: ${error.message}`);
    }
  }

  // Update an existing customer
  async updateCustomer(customerId, updateFields) {
    try {
      const customer = await this.stripe.customers.update(customerId, updateFields);
      return customer;
    } catch (error) {
      throw new Error(`Error updating customer: ${error.message}`);
    }
  }

  // Delete an existing customer
  async deleteCustomer(customerId) {
    try {
      const confirmation = await this.stripe.customers.del(customerId);
      return confirmation;
    } catch (error) {
      throw new Error(`Error deleting customer: ${error.message}`);
    }
  }

  // Retrieve a customer
  async retrieveCustomer(customerId) {
    try {
      const customer = await this.stripe.customers.retrieve(customerId);
      return customer;
    } catch (error) {
      throw new Error(`Error retrieving customer: ${error.message}`);
    }
  }
}

module.exports = CustomerService;