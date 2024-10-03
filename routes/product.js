// routes/product.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Lấy danh sách sản phẩm
router.get('/get', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', { products });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        res.status(500).send('Có lỗi xảy ra khi lấy danh sách sản phẩm');
    }
});

// Hiển thị form thêm sản phẩm
router.get('/new', (req, res) => {
    res.render('newProduct');
});

// Thêm sản phẩm mới
router.post('/', async (req, res) => {
    const newProduct = new Product({
        ProductCode: req.body.ProductCode,
        ProductName: req.body.ProductName,
        ProductDate: req.body.ProductDate,
        ProductOriginPrice: req.body.ProductOriginPrice,
        Quantity: req.body.Quantity,
        ProductStoreCode: req.body.ProductStoreCode,
    });

    try {
        await newProduct.save();
        res.redirect('/products');
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
        res.status(500).send('Có lỗi xảy ra khi thêm sản phẩm');
    }
});

// Hiển thị form sửa sản phẩm
router.get('/:id/edit', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('editProduct', { product });
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
        res.status(500).send('Có lỗi xảy ra khi lấy sản phẩm');
    }
});

// Cập nhật sản phẩm
router.post('/:id', async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, {
            ProductCode: req.body.ProductCode,
            ProductName: req.body.ProductName,
            ProductDate: req.body.ProductDate,
            ProductOriginPrice: req.body.ProductOriginPrice,
            Quantity: req.body.Quantity,
            ProductStoreCode: req.body.ProductStoreCode,
        });
        res.redirect('/products');
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        res.status(500).send('Có lỗi xảy ra khi cập nhật sản phẩm');
    }
});

// Xóa sản phẩm
router.post('/:id/delete', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).send('Có lỗi xảy ra khi xóa sản phẩm');
    }
});

module.exports = router;
