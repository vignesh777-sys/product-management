# Quick Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

## Quick Start

### Option 1: Use the batch file (Windows)
1. Double-click `start.bat`
2. Wait for both servers to start
3. Open http://localhost:3000 in your browser

### Option 2: Manual setup

#### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

#### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

#### 3. Start MongoDB
Make sure MongoDB is running on your system:
- Local: `mongod`
- Or use MongoDB Atlas (cloud)

#### 4. Start Backend Server
```bash
cd backend
npm start
```
Backend will be available at: http://localhost:5000

#### 5. Start Frontend Server (in a new terminal)
```bash
cd frontend
npm start
```
Frontend will be available at: http://localhost:3000

## Testing the Application

1. Open http://localhost:3000
2. Click "Go to Products" or navigate to Products page
3. Try adding a new product
4. Test search and sort functionality
5. Test edit and delete operations

## API Testing

You can test the API directly:
- Health check: http://localhost:5000/health
- Get products: http://localhost:5000/api/products
- Create product: POST http://localhost:5000/api/products

## Troubleshooting

### Backend Issues
- Make sure MongoDB is running
- Check if port 5000 is available
- Check console for error messages

### Frontend Issues
- Make sure backend is running on port 5000
- Check browser console for errors
- Try refreshing the page

### Database Issues
- Ensure MongoDB is installed and running
- Check connection string in backend/config.js
- For MongoDB Atlas, update the connection string

## Features to Test

✅ **Must Have Features:**
- Display list of products
- Add new product via form
- Delete product (with confirmation)
- Sort Products by Price
- Connect all three technologies successfully

✅ **Nice to Have Features:**
- Edit existing product
- Search products by name
- Basic form validation

All features are implemented and ready to test!
