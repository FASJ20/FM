export const createUserRegValSchema = {
  username: {
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    isString: {
      errorMessage: "Must be a string",
    },
  },
  age: {
    notEmpty: {
      errorMessage: "age is required",
    },
  },
  password: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "password must be between 5 to 32 characters",
    },
    notEmpty: {
      errorMessage: "Password is required",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "Email is not supposed to be empty",
    },
    isEmail: {
      errorMessage: "Must be an email",
    },
  },
};

export const createMemberCreationValSchema = {
  firstname: {
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    isString: {
      errorMessage: "Must be a string",
    },
  },
  lastname: {
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    isString: {
      errorMessage: "Must be a string",
    },
  },
  age: {
    notEmpty: {
      errorMessage: "age is required",
    },
  },
  dateofbirth: {
    isString: {
      errorMessage: "Must be Date",
    },
    notEmpty: {
      errorMessage: "Must not be empty",
    },
  },
  mother: {
    isString: {
      errorMessage: "Must be a string",
    },
  },
  father: {
    isString: {
      errorMessage: "Must be a string",
    },
  },
};
