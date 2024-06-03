const Joi = require('joi');

const listingSchema=Joi.object({
    listing:Joi.object({ 
    title:Joi.string().required(),
    description:Joi.string().required(),
    status:Joi.string().required(),
    keywords:Joi.string().required(),
    price:Joi.number().required().min(0),
    image:Joi.string().allow("",null),
    category: Joi.string().required(),
}).required(),

})

const categorySchema= Joi.object({
    category:Joi.object({
        category:Joi.string().required(),
    }).required(),
})



const contactSchema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      'string.base': 'Name should be a type of text',
      'string.empty': 'Name cannot be an empty field',
      'string.min': 'Name should have a minimum length of 2',
      'string.max': 'Name should have a maximum length of 50',
      'any.required': 'Name is a required field',
    }),
    contactNo: Joi.string().pattern(/^\d{10}$/).required().messages({
      'string.base': 'Contact number should be a type of text',
      'string.empty': 'Contact number cannot be an empty field',
      'string.pattern.base': 'Contact number must be a valid 10 digit number',
      'any.required': 'Contact number is a required field',
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'Email should be a type of text',
      'string.empty': 'Email cannot be an empty field',
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is a required field',
    }),
    subject: Joi.string().min(2).max(100).required().messages({
      'string.base': 'Subject should be a type of text',
      'string.empty': 'Subject cannot be an empty field',
      'string.min': 'Subject should have a minimum length of 2',
      'string.max': 'Subject should have a maximum length of 100',
      'any.required': 'Subject is a required field',
    }),
    message: Joi.string().min(10).max(500).required().messages({
      'string.base': 'Message should be a type of text',
      'string.empty': 'Message cannot be an empty field',
      'string.min': 'Message should have a minimum length of 10',
      'string.max': 'Message should have a maximum length of 500',
      'any.required': 'Message is a required field',
    }),
  });



module.exports = {
    listingSchema,
    categorySchema,
    contactSchema,
};