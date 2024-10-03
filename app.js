const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const productRouter = require('./routes/product'); // Đường dẫn đến router

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Kết nối MongoDB thành công'))
    .catch(err => console.error('Lỗi kết nối MongoDB:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Thêm middleware để xử lý JSON
app.use(express.static('public')); // Nếu bạn có các file tĩnh như CSS, JS

app.set('view engine', 'ejs');
app.set('views', './views'); // Đường dẫn đến thư mục views (nếu cần)

// Sử dụng router cho sản phẩm
app.use('/products', productRouter); // Sử dụng router cho đường dẫn /products

// Trang chính hiển thị form thêm sản phẩm
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Trả về file HTML cho giao diện chính
});

// Lắng nghe cổng
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
