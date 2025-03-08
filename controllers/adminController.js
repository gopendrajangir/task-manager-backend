import Product from "../models/Product.js";

export async function createProduct(req, res) {
  try {
    let newItem = req.body;
    let product = await Product.create(newItem);

    await product.save();
    res
      .status(201)
      .json({ status: "success", message: "Product created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function updateProduct(req, res) {
  try {
    let id = req.params.id;
    let updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(204).json({
      status: "success",
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.send(500).send(error);
  }
}

export async function deleteProduct(req, res) {
  try {
    let id = req.params.id;
    await Product.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
