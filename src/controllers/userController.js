import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

const generateAccessAndRefreshToken = async (userID) => {
  try {
    const user = await User.findById(userID);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "something went wrong while generating refresh and acces token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, terms } = req.body;
  console.log({ name, email, phone, password });
  if ([name, email, phone, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "name is required");
  }
  // for single field
  //  const existedUser = await User.findOne({ email });

  // for more than one field
  const existedUser = await User.findOne({
    $or: [{ email }, { email }],
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
  console.log("🚀 ~ registerUser ~ user:", user)
  // from below code we are removing passwordfields to save in database while registering user.
  const createdUser = await User.findById(user._id).select("-password");
  console.log("🚀 ~ registerUser ~ createdUser:", createdUser)

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // get data from req body
  // check username or email
  // find the user or email
  // check password
  // generate acces and refresh token
  // send (acces and refresh token) through cookies

  const { username, email, password } = req.body;

  if (!username || !email) {
    throw new ApiError(400, "username or email is required");
  }

  //  to find user through username or email
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "user does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id)
    //  "select" is use for which field you do not want"
    .select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "user logged in successfully"
      )
    );
});

export { registerUser, loginUser };
