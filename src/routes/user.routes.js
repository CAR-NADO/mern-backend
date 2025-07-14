import { Router } from "express";
import { registerUser, loginUser, productList, createProduct, updateProduct, deleteProduct } from "../controllers/userController.js";
// import { registerValidation } from "../validations/auth.js";

const router = Router();

// router.post("/register", (req, res) => {
//   registerUser(req).then((resp) => {
//     res.status(resp.status).json(resp);
//   });
// });

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/product/list").post(productList);
router.route("/product/create").post(createProduct);
router.route("/product/update").post(updateProduct);
router.route("/product/delete").post(deleteProduct);

export default router;
