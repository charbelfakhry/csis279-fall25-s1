/**
 * This is a validator to validate the bulk email
 */

/**
 * method the check if email is valid
 * return true if valid, false otherwise
 */
const isEmailFormValid = (email) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * check if the domain can accept emails 
 * return trye if the domain has MX records, false otherwise
 */
const emailDomainValid = (email) => {
    // Extract domain from email address
    const domain = email.split('@')[1]; 
    return new Promise((resolve, reject) =>{
        dns.resolveMX(domain,(err,addresses)=>{     
        if (err || !addresses || addresses.length === 0){
            resolve(false); //invalid record
        }
        else{
            resolve(true); //valid record
        }
    });
    });
    };

    /**
     * checking format and domain existance
     */
    const validateEmail = async(email) => {

        if(isEmailFormatValid(email)){
            return{
                isValid: false, message: 'invalid email format.'
            };
        }

        try {
            const isDomainValid = await isEmailDomainValid(email);
            if (isDomainValid) {
                return { isValid: true, message: 'Valid email.' };
            } else {
                return { isValid: false, message: 'Email domain does not exist.' };
            }
        } catch (error) {
            return { isValid: false, message: 'Error validating email' 
                };
        }
    };

    
