require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 99.99,
        stock: 50,
    },
    {
        name: 'Mechanical Keyboard',
        category: 'Electronics',
        price: 149.99,
        stock: 20,
    },
    {
        name: 'Gaming Mouse',
        category: 'Electronics',
        price: 59.99,
        stock: 100,
    },
    {
        name: 'USB-C Cable',
        category: 'Accessories',
        price: 19.99,
        stock: 200,
    },
    {
        name: 'Monitor Stand',
        category: 'Accessories',
        price: 39.99,
        stock: 5, // Low stock for testing
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB for seeding...');

        await Product.deleteMany({});
        console.log('Cleared existing products.');

        await Product.insertMany(products);
        console.log('Seeded products.');

        process.exit();
    } catch (error) {
        console.error('Error seeding DB:', error);
        process.exit(1);
    }
};

seedDB();
