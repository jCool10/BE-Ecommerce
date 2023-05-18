# BE-Ecommerce

## Mục đích

- Dự án này nhằm xây dựng một hệ thống backend cho một ứng dụng thương mại điện tử. Nó cung cấp các API để quản lý sản phẩm, đơn hàng, người dùng và các chức năng liên quan khác. Mục tiêu của dự án là cung cấp một nền tảng mạnh mẽ để phát triển ứng dụng thương mại điện tử linh hoạt và có thể mở rộng.

## Cài đặt

1. Sao chép dự án từ kho lưu trữ:

```bash
git clone https://github.com/jCool10/BE-Ecommerce.git
```

2. Cài đặt các phụ thuộc:

```bash
npm install
```

3. Cấu hình biến môi trường:

Tạo một tệp `.env` trong thư mục gốc của dự án và cung cấp các biến môi trường sau:

```.env
PORT=
MONGODB_URI=<Đường dẫn MongoDB>
```

## Sử dụng

Chạy ứng dụng:

```bash
npm run dev
```

Sau khi ứng dụng chạy thành công, bạn có thể truy cập vào địa chỉ `http://localhost:${process.env.PORT} `hoặc địa chỉ đã được cấu hình để sử dụng các API của dự án.

## Cấu trúc thư mục

- `src`: Thư mục chứa mã nguồn của ứng dụng
  - `src/auth`: Chứa các file liên quan đến xác thực người dùng: xác minh danh tính của người dùng, xác thực mật khẩu và xác thực thông qua phương thức JWT (JSON Web Tokens)
  - `src/controllers`: Chứa các file nhận request, gọi đến service để xử lý logic nghiệp vụ, trả về response.
  - `src/services`: Chứa các file chứa method gọi đến database để xử lý logic nghiệp vụ.
  - `src/models`: Chứa các file chứa các model
  - `src/routes`: Chứa các file chứa các route
  - `src/utils`: Chứa các file chứa các chức năng phổ biến mà bạn sẽ yêu cầu nhiều lần trong suốt mã của mình ví dụ như check missing params trước khi xử lý dữ liệu chẳng hạn

## Dự án dự kiến bao gồm những tính năng sau

- Authentication
  - Login [Public]
  - SignUp [Public]
  - Logout [User]
  - Tokens [User]
- Password Management
  - Change Password [User]
  - Forgot Password [Public]
  - Reset Password [Public]
- Email Management
  - Send Email Verification [User]
- User
  - Create New User [Admin]
  - Get All Users [Public]
  - Get User Data Using It's ID [Public]
  - Update User Details Using It's ID [User]
  - Update User Profile Image Using It's ID [User]
  - Delete My Account [User]
  - Delete User Using It's ID [Admin]
- Cart Services
  - Add Product To Cart [User]
  - Reduce Product Quantity By One [User]
  - Increase Product Quantity By One [User]
  - Get Cart [User]
  - Delete Cart Item [User]
  - Delete Cart [User]
- Review Services
  - Create New Review [User]
  - Query All Reviews [Public]
  - Query Review Using It's ID [Public]
  - Update Review Using It's ID [User]
  - Delete Review Using It's ID [User]
- Product Services
  - Query products [Public]
  - Query Product Using It's ID [Public]
  - Create new product [Seller]
  - Update Product Details [Seller]
  - Update Product Main Image [Seller]
  - Update Product Images [Seller]
  - Delete Product Using It's ID [User]
  - Get Products Statics [Admin]
  - Top 5 Cheapeast Products [Public]
  - Add Product Color [Seller]
  - Add Product Size [Seller]
  - Delete Product Color [Seller]
  - Delete Product Size [Seller]
- Favorite Services
  - Get Favorite Products List [User]
  - Add Product to Favorite List [User]
  - Delete Product From Favorite List [User]
  - Check If Product In Favorite List [User]
- Discount Services
  - Generate Discount Code [Admin]
  - Get Dicount Amount [User]
  - Get All Discount Codes [Admin]
  - Verify Discount Code [User]
  - Delete Discount Code [Admin]
  - Cancel Discount Code [User]
- Order Services
  - Create New Order [User]
  - Query Orders [User]
  - Query Order Using It's ID [User]
  - Cancel Order [User]
  - Update Order Status [Admin]
- Category Services
  - Create New Category [User]
  - Query Categories [Public]
  - Query Category Using It's ID [Public]
  - Update Category Details [Admin]
  - Update Category Image [Admin]
  - Delete Category [Admin]
- Multi-Language Support
