import Joi from "joi";

const AddUserProfileSchema = Joi.object({
    Name: Joi.string().required().max(100),
    Gender: Joi.string().required().max(10),
    Contact: Joi.string().min(10).max(10),
    Address: Joi.string().max(200),
    ImageName: Joi.string().max(200),
    UserId: Joi.number().required(),
});

export default AddUserProfileSchema;