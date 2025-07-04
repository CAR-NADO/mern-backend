import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
// import { registerValidation } from "../validations/auth.js";

const router = Router();

// router.route("/register").post(registerUser);
router.post("/register", (req, res) => {
  registerUser(req).then((resp) => {
    res.status(resp.status).json(resp);
  });
});

router.route("/login").post(loginUser);

export default router;

// console.log("first")