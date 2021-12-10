const Joi = require("joi");

const userRegisterValidationSchema = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    phone: Joi.number().min(6).required(),
    location: Joi.string().min(6).required(),
    userType: Joi.string().required(),
    description: Joi.string().min(6),
    tailorType: Joi.string().min(3),
  });
  return schema.validate(data);
};

const userLoginValidationSchema = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const userUpdateValidationSchema = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6),
    email: Joi.string().min(6).email(),
    location: Joi.string(),
    phone: Joi.number().min(6),
    description: Joi.string().min(6),
    tailorType: Joi.string().min(3),
  });
  return schema.validate(data);
};

module.exports = {
  userRegisterValidationSchema,
  userLoginValidationSchema,
  userUpdateValidationSchema,
};
