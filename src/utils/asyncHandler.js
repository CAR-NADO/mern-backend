const asyncHandler = (requestHandler) => {
  console.log("here sdffsd")
  return (req, res, next) => {
    console.log("here dfgff")
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
