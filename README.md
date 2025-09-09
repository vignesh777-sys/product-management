# Product Management System

A full-stack web application for managing products with CRUD operations, built with React, Node.js, Express, and MongoDB.

## Features

### Frontend (React)
- ✅ Product List Page: Display all products in a responsive grid
- ✅ Add Product Form: Create new products with validation
- ✅ Product Card Component: Reusable component showing product info
- ✅ Edit existing products
- ✅ Delete products with confirmation
- ✅ Search products by name
- ✅ Sort products by price (ascending/descending)
- ✅ Filter products by category
- ✅ Responsive design with modern UI
- ✅ Form validation and error handling

### Backend (Node.js + Express)
- ✅ GET /api/products - Get all products with search, sort, and filter
- ✅ POST /api/products - Add new product
- ✅ PUT /api/products/:id - Update existing product
- ✅ DELETE /api/products/:id - Delete product
- ✅ Basic error handling and validation
- ✅ CORS configuration
- ✅ MongoDB integration with Mongoose

### Database (MongoDB)
- ✅ Product Schema with validation
- ✅ Required fields: name, price, category
- ✅ Optional field: description
- ✅ Category enum validation
- ✅ Indexes for better performance

## Project Structure

```
pms/
├── backend/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── package.json        # Backend dependencies
│   └── server.js           # Main server file
├── frontend/               # React frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── App.js          # Main app component
│   └── package.json        # Frontend dependencies
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd pms
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Database Setup
Make sure MongoDB is running on your system:
- Local MongoDB: `mongod`
- Or use MongoDB Atlas (cloud)

### 5. Environment Configuration
The backend uses default configuration:
- Port: 5000
- MongoDB URI: mongodb://localhost:27017/product-management

## Running the Application

### Start the Backend
```bash
cd backend
npm start
# or for development with auto-restart
npm run dev
```

The backend will be available at: http://localhost:5000

### Start the Frontend
```bash
cd frontend
npm start
```

The frontend will be available at: http://localhost:3000

## API Endpoints

### Products
- `GET /api/products` - Get all products
  - Query params: `search`, `category`, `sort`, `order`
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Health Check
- `GET /health` - API health status

## Product Schema

```javascript
{
  name: String (required, max 100 chars),
  price: Number (required, min 0),
  description: String (optional, max 500 chars),
  category: String (required, enum: Electronics, Clothing, Books, etc.)
}
```

## Technologies Used

### Frontend
- React 18
- React Router DOM
- Axios (HTTP client)
- Lucide React (icons)
- Custom CSS (Tailwind-like utilities)

### Backend
- Node.js
- Express.js
- Mongoose (MongoDB ODM)
- CORS
- Helmet (security)
- Morgan (logging)

### Database
- MongoDB
- Mongoose schemas and validation

## Development

### Adding New Features
1. Backend: Add routes in `backend/routes/`
2. Frontend: Add components in `frontend/src/components/`
3. API: Update `frontend/src/services/api.js`

### Code Structure
- Components are modular and reusable
- API calls are centralized in services
- Error handling is implemented throughout
- Form validation on both client and server

## Deployment

### Backend Deployment
1. Set environment variables for production
2. Use PM2 or similar for process management
3. Configure MongoDB Atlas for production database

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to static hosting (Netlify, Vercel, etc.)
3. Update API URL in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.