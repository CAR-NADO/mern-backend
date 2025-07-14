import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

const generateToken = async (userID) => {
  try {
    const user = await User.findById(userID);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();

    await user.save({ validateBeforeSave: false });

    return { accessToken };
  } catch (error) {
    console.error("Error in generateToken:", error);
    throw new ApiError(500, "Something went wrong while generating access token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, terms } = req.body;
  if ([name, email, phone, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "name is required");
  }
  // for single field
  //  const existedUser = await User.findOne({ email });

  // for more than one field
  const existedUser = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    terms,
  });
  // from below code we are removing passwordfields to save in database while registering user.
  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res.status(200).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email: loginEmail, password } = req.body;

  if (!loginEmail || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  //  to find user through username or email
  const user = await User.findOne({ email: loginEmail });

  if (!user) {
    throw new ApiError(404, "user does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "invalid user credentials");
  }

  //  "select" is use for which field you do not want"
  const { accessToken } = await generateToken(user._id);

  const { createdAt, updatedAt, _id, name, email, phone, terms } = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        [{ createdAt, updatedAt, _id, name, email, phone, terms, token: accessToken }],
        "user logged in successfully"
      )
    );
});

export { registerUser, loginUser };
