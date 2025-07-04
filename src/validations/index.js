export const validate = (validations) => {
  return async (req, res, next) => {
    try {
      await Promise.all(validations.map((validation) => validation.run(req)));

      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }

      const errorMessage = errors.array()[0].msg;

      res.status(422).json({
        status: 422,
        data: [{ msg: errorMessage }],
      });
    } catch (err) {
      res.status(422).json({
        status: 422,
        data: [{ msg: err.message }],
      });
    }
  };
};