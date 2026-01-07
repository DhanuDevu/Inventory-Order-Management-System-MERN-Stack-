require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Database Connection
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => {
      console.error('❌ MongoDB Connection Error:', err.message);
      console.log('⚠️  Server will continue to run, but database operations will fail.');
      console.log('💡 Make sure MongoDB is running: mongod or use MongoDB Atlas');
    });
} else {
  console.warn('⚠️  MONGO_URI not set in environment variables');
  console.warn('💡 Create a .env file with: MONGO_URI=mongodb://localhost:27017/inventory-order-app');
}

// Basic Route
app.get('/', (req, res) => {
  res.send('Inventory Management API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
