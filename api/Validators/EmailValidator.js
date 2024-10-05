/**
 * This is a validator to validate the bulk email
 */

//TODO find good solution to check if email exists

const dns = require('dns');

/**
 * method the check if email is valid
 * return true if valid, false otherwise
 */
const IsEmailFormValid = (email) =>{
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
};

/**
 * check if the domain can accept emails
 * return trye if the domain has MX records, false otherwise
 */
const EmailDomainValid = (email) => {
    const domain = email.split('@')[1];
    return new Promise((resolve, reject) => {
        dns.resolveMx(domain, (err, addresses) => {
            if (err || !addresses || addresses.length === 0) {
                resolve(false); // Invalid record
            } else {
                resolve(true); // Valid record
            }
        });
    });
};

    /**
     * checking format and domain existance
     */
    const ValidateEmail = (email) => {

        if(!IsEmailFormValid(email))
            return { isValid: false, message: 'invalid Email format.' };

        return { isValid: true, message: 'Valid Email format.' };


        /*try {
            const isDomainValid = await EmailDomainValid(email);
            if (isDomainValid) {
                return { isValid: true, message: 'Valid email.' };
            } else {
                return { isValid: false, message: 'Email domain does not exist.' };
            }
        } catch (error) {
            return { isValid: false, message: 'Error validating email ' + error
                };
        }*/
    };

    module.exports = {ValidateEmail}


