export const createUserValidationSchema = {
    name: {
        isLength: {
            options:{
                min: 5,
                max: 32,
            },
           errorMessage: "name must be between 5 to 32 characters"    
        },
        notEmpty: {
            errorMessage: "Name cannot be empty"
        },
        isString:{
            errorMessage: "Must be a string"
        }
    },
        age: {
        notEmpty: true,
        errorMessage: "age is required"
        
    },
    password: {
        notEmpty: true,
        errorMessage: "Password is required",
    },
    email: {
        notEmpty: true,
        errorMessage: "email is required",
    },
};

 