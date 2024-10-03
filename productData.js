// productData.js
let productList = []; // Mảng để lưu trữ sản phẩm

// Hàm để thêm sản phẩm vào danh sách
const addProduct = (product) => {
    productList.push(product);
};

// Hàm để lấy danh sách sản phẩm
const getProducts = () => {
    return productList;
};

// Xuất các hàm
module.exports = {
    addProduct,
    getProducts,
};
