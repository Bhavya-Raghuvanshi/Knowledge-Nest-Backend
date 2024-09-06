import Joi from "joi";

const UpdateSemestersSchema = Joi.object({
  Semester: Joi.number().required(),
  YearId: Joi.number().required(),
});

export default UpdateSemestersSchema;