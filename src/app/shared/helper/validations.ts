const loginFormErrors = {
  email: '',
  password: '',
};

const loginFormvalidationMessages = {
  email: {
    required: 'Email is required.',
    pattern: 'Enter valid mail.',
  },
  password: {
    required: 'Password is required.',
  },
};

const signUpFormvalidationMessages = {
  email: {
    required: 'Username is required.',
    pattern: 'Enter valid mail.'
  },
  firstName: {
    required: 'First name is required.',
    pattern: "First name must contain only letters.",
  },
  lastName: {
    required: 'Last name is required.',
    pattern: "Last name must contain only letters.",
  },

  password: {
    required: 'Password is required.',
    pattern: '',
  },
  address: {
    required: 'Address is required.',
  },
  birthDate: {
    required: 'Birth Date is required.',
  },
};

const signupFormErrors = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  address: '',
  birthDate: '',
};

const createEmployeeFormErrors = {
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  birthDate: '',
  mobile: '',
};

const createEmployeeFormvalidationMessages = {
  firstName: {
    required: 'First Name is required.',
    pattern: 'First name must contain only letters.',
  },
  lastName: {
    required: 'Last name is required.',
    pattern: 'Last name must contain only letters.',
  },
  birthDate: {
    required: 'Birth Date is required.',
  },
  mobile: {
    required: 'Mobile no. is required.',
    minlength: 'Enter 10 digit Mobile Number.',
    maxlength: 'Enter 10 digit Mobile Number.',
  },
  address: {
    required: 'Address is required.',
  },
  city: {
    required: 'City is required.',
  },
};

const allowNumbersOnly = '^[0-9]+$';

const allowChartersOnly = '^[a-zA-Z ]+$';

const allowedMailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

export {
  allowNumbersOnly,
  allowChartersOnly,
  allowedMailPattern,
  loginFormErrors,
  loginFormvalidationMessages,
  signUpFormvalidationMessages,
  signupFormErrors,
  createEmployeeFormErrors,
  createEmployeeFormvalidationMessages,
};
