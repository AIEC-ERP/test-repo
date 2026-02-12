export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.reduce((acc, detail) => {
        const key = detail.path[0];
        acc[key] = detail.message.replace(/"/g, ''); 
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: errorMessages
      });
    }
    next();
  };
};