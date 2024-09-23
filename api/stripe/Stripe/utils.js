const VALID_PAYMENT_METHODS = ['card', 'bank_transfer', 'paypal'];

function isValidCurrency(currency) {
    const currencyRegex = /^[A-Z]{3}$/;
    return currencyRegex.test(currency);
}


function isValidAmount(amount) {
    return Number.isInteger(amount) && amount > 0;
}

function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


module.exports = {
    VALID_PAYMENT_METHODS,
    isValidCurrency,
    isValidAmount,
    isEmailValid,
};

