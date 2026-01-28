export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validatePhone = (phone) => {
  // Accepts formats: 1234567890, 123-456-7890, (123) 456-7890, 123 456 7890, +91 1234567890
  const re = /^[+]?[1-9][\d]{0,15}$/;
  return re.test(phone.replace(/[ \-( )]/g, ''));
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validateNotEmpty = (value) => {
  return value.trim().length > 0;
};

export const validateCreditCard = (cardNumber) => {
  // Luhn algorithm for credit card validation
  const re = /^[0-9]{13,19}$/;
  if (!re.test(cardNumber.replace(/\s/g, ''))) return false;
  
  let sum = 0;
  let shouldDouble = false;
  
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
};

export const validateExpiryDate = (expiry) => {
  const re = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  if (!re.test(expiry)) return false;
  
  const [month, year] = expiry.split('/');
  const expiryDate = new Date(2000 + parseInt(year, 10), parseInt(month, 10) - 1);
  const currentDate = new Date();
  
  return expiryDate > currentDate;
};

export const validateCVV = (cvv) => {
  const re = /^[0-9]{3,4}$/;
  return re.test(cvv);
};

export const validateZipCode = (zipCode) => {
  const re = /^[0-9]{5}(-[0-9]{4})?$/;
  return re.test(zipCode);
};

export const validateForm = (fields) => {
  const errors = {};
  
  Object.entries(fields).forEach(([field, value]) => {
    switch (field) {
      case 'email':
        if (!validateEmail(value)) {
          errors.email = 'Please enter a valid email address';
        }
        break;
      case 'password':
        if (!validatePassword(value)) {
          errors.password = 'Password must be at least 6 characters';
        }
        break;
      case 'phone':
        if (!validatePhone(value)) {
          errors.phone = 'Please enter a valid phone number';
        }
        break;
      case 'name':
        if (!validateName(value)) {
          errors.name = 'Name must be at least 2 characters';
        }
        break;
      case 'cardNumber':
        if (!validateCreditCard(value)) {
          errors.cardNumber = 'Please enter a valid credit card number';
        }
        break;
      case 'expiry':
        if (!validateExpiryDate(value)) {
          errors.expiry = 'Please enter a valid expiry date (MM/YY)';
        }
        break;
      case 'cvv':
        if (!validateCVV(value)) {
          errors.cvv = 'Please enter a valid CVV';
        }
        break;
      case 'zipCode':
        if (!validateZipCode(value)) {
          errors.zipCode = 'Please enter a valid zip code';
        }
        break;
      default:
        if (!validateNotEmpty(value)) {
          errors[field] = 'This field is required';
        }
        break;
    }
  });
  
  return errors;
};