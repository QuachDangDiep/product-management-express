// routes/product.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const { addProduct } = require('../productData');

// Lấy danh sách sản phẩm
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products); // Trả về danh sách sản phẩm dưới dạng JSON
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi lấy danh sách sản phẩm' });
    }
});

// Thêm sản phẩm mới
router.post('/', async (req, res) => {
    const { ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!ProductCode || !ProductName || !ProductDate || !ProductOriginPrice || !Quantity || !ProductStoreCode) {
        return res.status(400).json({ success: false, message: 'Thiếu thông tin sản phẩm' });
    }

    const newProduct = new Product({
        ProductCode,
        ProductName,
        ProductDate,
        ProductOriginPrice,
        Quantity,
        ProductStoreCode,
    });

    try {
        await newProduct.save();
        addProduct(newProduct);
        res.status(201).json({ success: true, message: 'Sản phẩm đã được thêm thành công', product: newProduct });
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
        res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi thêm sản phẩm', error: error.message });
    }
});

// Lấy thông tin sản phẩm
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại' });
        }
        res.json(product); // Trả về sản phẩm dưới dạng JSON
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
        res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi lấy sản phẩm' });
    }
});

// Cập nhật sản phẩm
router.put('/:id', async (req, res) => {
    const { ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!ProductCode || !ProductName || !ProductDate || !ProductOriginPrice || !Quantity || !ProductStoreCode) {
        return res.status(400).json({ success: false, message: 'Thiếu thông tin cần cập nhật' });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            ProductCode,
            ProductName,
            ProductDate,
            ProductOriginPrice,
            Quantity,
            ProductStoreCode,
        }, { new: true, runValidators: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại' });
        }
        res.json({ success: true, message: 'Sản phẩm đã được cập nhật thành công', product: updatedProduct });
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi cập nhật sản phẩm' });
    }
});

// Xóa sản phẩm
router.delete('/:id', async (req, res) => {
    const id = req.params;

    // Kiểm tra xem ID có hợp lệ không
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send({ success: false, message: 'ID sản phẩm không hợp lệ' });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).send({ success: false, message: 'Sản phẩm không tồn tại' });
        }
        res.send({ success: true, message: 'Sản phẩm đã được xóa thành công' });
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error); // Log lỗi
        res.status(500).send({ success: false, message: 'Có lỗi xảy ra khi xóa sản phẩm', error: error.message });
    }
});



module.exports = router;
