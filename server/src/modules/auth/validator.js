import Joi from "joi";

export const loginSchema = Joi.object({
  username: Joi.string()
    .trim()                   
    .min(3)
    .max(20)                   
    .required()
    .messages({
      'string.empty': 'Username cannot be empty',
      'string.min': 'Username must be at least 3 characters',
      'string.max': 'Username cannot exceed 50 characters',
      'any.required': 'Username is required'
    }),

  password: Joi.string()
    .min(3)            
    .required()
    .messages({
      'string.empty': 'Password cannot be empty',
      'any.required': 'Password is required'
    })
});