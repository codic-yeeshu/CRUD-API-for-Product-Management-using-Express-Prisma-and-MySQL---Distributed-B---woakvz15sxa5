const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

router.use(authMiddleware);
`Create a New Product: POST /api/products/create
Retrieve All Products: GET /api/products/get
Retrieve Product by ID: GET /api/products/getById/:id
Update a Product (Full Update): PUT /api/products/put/:id
Partially Update a Product: PATCH /api/products/patch/:id
Delete a Product: DELETE /api/products/delete/:id`;

//write your code here
router.post("/create", createProduct);
router.get("/get", getProduct);
router.get("/getById/:id", getProduct);
router.put("/put/:id", updateProduct);
router.patch("/patch/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
