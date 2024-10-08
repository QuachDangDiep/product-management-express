const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const productRoutes = require('./routes/product');
const cors = require('cors');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/products', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Kết nối tới MongoDB thành công');
})
.catch((error) => {
    console.error('Lỗi kết nối tới MongoDB:', error);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Thêm middleware để xử lý JSON
app.use(express.static('public')); // Nếu bạn có các file tĩnh như CSS, JS
app.use(cors());

// Sử dụng router cho sản phẩm
app.use('/products', productRoutes);

// Lắng nghe cổng
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
