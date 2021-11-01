const Joi = require("joi");

const userRegisterValidationSchema = (data) => {
  const userType = data.type.toLowerCase();
  if (userType === "user") {
    // user validation
    const schema = Joi.object({
      username: Joi.string().min(6).required(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
      location: Joi.string().required(),
      phone: Joi.number().min(6).required(),
      type: Joi.string(),
    });
    return schema.validate(data);
  } else if (userType === "tailor") {
    // tailor validation
    const schema = Joi.object({
      username: Joi.string().min(6).required(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
      location: Joi.string().required(),
      phone: Joi.number().min(6).required(),
      description: Joi.string().min(6).required(),
      tailorType: Joi.string().min(3).required(),
      type: Joi.string(),
    });
    return schema.validate(data);
  } else {
    throw new Error("Incorrect Type");
  }
};

const userUpdateValidationSchema = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
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

module.exports = {
  userRegisterValidationSchema,
  userLoginValidationSchema,
  userUpdateValidationSchema,
};
