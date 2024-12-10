const { prisma } = require("../db/config");

const createProduct = async (req, res) => {
  try {
    const { name, stock, price } = req.body;

    if (!name || !stock || !price)
      return res.status(400).json({
        error: "All fields required",
      });

    const newProduct = await prisma.product.create({
      data: { name, stock, price },
    });

    return res.status(201).json(newProduct);
  } catch (err) {
    console.error(
      `Error occurred in file: product Controller, function: createProduct -`,
      err
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      const allProducts = await prisma.product.findMany();
      return res.status(200).json(allProducts);
    }
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID provided" });
    }

    // get product by id

    const productOfId = await prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!productOfId) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(productOfId);
  } catch (err) {
    console.error(
      `Error occurred in file: product Controller, function: getProduct -`,
      err
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, stock, price } = req.body;
    const updateField = {};
    if (name) updateField.name = name;
    if (stock) updateField.stock = stock;
    if (price) updateField.price = price;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID provided" });
    }
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: updateField,
    });

    return res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(
      `Error occurred in file: product Controller, function: updateProduct -`,
      err
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID provided" });
    }

    await prisma.product.delete({ where: { id: parseInt(id, 10) } });

    return res.status(200).json({
      message: "Product is deleted",
    });
  } catch (err) {
    console.error(
      `Error occurred in file: product Controller, function: deleteProduct -`,
      err
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createProduct, updateProduct, getProduct, deleteProduct };
