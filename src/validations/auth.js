// import { body } from "express-validator";
// import { validate } from ".";
// // import { error } from "../commons";
// // import db from "../sequelize/models";

// export const registerValidation = validate([
//   body("name").trim().notEmpty().withMessage("The email field is required.").toLowerCase(),
//   body("email")
//     .trim()
//     .notEmpty()
//     .withMessage("The email field is required.")
//     .toLowerCase()
//     .isEmail()
//     .withMessage("Please enter a valid email."),
//   body("prefix").trim().notEmpty().withMessage("The prefix field is required.").toLowerCase(),
//   body("phone").trim().notEmpty().withMessage("The phone field is required.").toLowerCase(),
//   body("password").trim().notEmpty().withMessage("The password field is required."),
//   body("terms").trim().notEmpty().withMessage("The terms field is required."),
// ]);

// // export const emailVerificationValidation = validate([
// //   body("id")
// //     .trim()
// //     .notEmpty()
// //     .withMessage("The id field is required.")
// //     .customSanitizer(async (uuid) => {
// //       const result = await db.User.findOne({ where: { uuid: uuid } });

// //       if (!result) {
// //         throw new Error(error.invalid_id.msg);
// //       }

// //       return result.id;
// //     }),
// //   body("email_verification_code").trim().notEmpty().withMessage("The email verification code field is required."),
// // ]);

// // export const createPasswordValidation = validate([
// //   body("id")
// //     .trim()
// //     .notEmpty()
// //     .withMessage("The id field is required.")
// //     .customSanitizer(async (uuid) => {
// //       const result = await db.User.findOne({ where: { uuid: uuid } });

// //       if (!result) {
// //         throw new Error(error.invalid_id.msg);
// //       }

// //       return result.id;
// //     }),
// //   passwordValidator,
// // ]);

// // export const loginValidation = validate([
// //   body("email")
// //     .trim()
// //     .notEmpty()
// //     .withMessage("The email field is required.")
// //     .toLowerCase()
// //     .isEmail()
// //     .withMessage("Please enter a valid email."),
// //   passwordValidator,
// // ]);

// // export const forgotPasswordValidation = validate([
// //   body("email")
// //     .trim()
// //     .notEmpty()
// //     .withMessage("The email field is required.")
// //     .toLowerCase()
// //     .isEmail()
// //     .withMessage("Please enter a valid email."),
// // ]);

// // export const productOfferedValidation = validate([]);

// // export const invitationValidateValidation = validate([
// //   body("id")
// //     .trim()
// //     .notEmpty()
// //     .withMessage("The id field is required.")
// //     .customSanitizer(async (uuid) => {
// //       const result = await db.Invitation.findOne({
// //         where: { uuid: uuid, signup: false },
// //       });

// //       if (!result) {
// //         throw new Error(error.invalid_id.msg);
// //       }

// //       return result.id;
// //     }),
// // ]);

// // export const resetPasswordValidation = validate([
// //   body("password").trim().notEmpty().withMessage("The password field is required."),

// //   body("confirm_password")
// //     .trim()
// //     .notEmpty()
// //     .withMessage("The confirm_password field is required.")
// //     .custom((value, { req }) => {
// //       if (value !== req.body.password) {
// //         throw new Error("Confirm password must match the new password.");
// //       }
// //       return true;
// //     }),
// // ]);

// // export const otpResendValidation = validate([
// //   body("id")
// //     .trim()
// //     .notEmpty()
// //     .withMessage("The id field is required.")
// //     .bail()
// //     .custom(async (uuid, { req }) => {
// //       const result = await db.User.findOne({ where: { uuid } });
// //       if (!result) {
// //         throw new Error(error.invalid_id.msg);
// //       }
// //       req.userId = result.id;
// //       return true;
// //     }),
// // ]);
