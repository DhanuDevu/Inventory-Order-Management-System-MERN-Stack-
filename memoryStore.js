// In-memory storage fallback when MongoDB is not available
// Initialize with default products from seed data
let products = [
  {
    _id: '1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 99.99,
    stock: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 149.99,
    stock: 20,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    name: 'Gaming Mouse',
    category: 'Electronics',
    price: 59.99,
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '4',
    name: 'USB-C Cable',
    category: 'Accessories',
    price: 19.99,
    stock: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '5',
    name: 'Monitor Stand',
    category: 'Accessories',
    price: 39.99,
    stock: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
let orders = [];

// Helper to create chainable query object
function createQuery(collection) {
  return {
    sort: function(sortObj) {
      const sorted = [...collection];
      if (sortObj) {
        const sortField = Object.keys(sortObj)[0];
        const sortOrder = sortObj[sortField] === -1 ? -1 : 1;
        sorted.sort((a, b) => {
          const aVal = a[sortField] ? new Date(a[sortField]).getTime() : 0;
          const bVal = b[sortField] ? new Date(b[sortField]).getTime() : 0;
          if (aVal < bVal) return -1 * sortOrder;
          if (aVal > bVal) return 1 * sortOrder;
          return 0;
        });
      }
      return Promise.resolve(sorted);
    }
  };
}

module.exports = {
  products: {
    find: function() {
      return createQuery(products);
    },
    findById: (id) => {
      const product = products.find(p => p._id === id || p._id.toString() === id);
      return Promise.resolve(product || null);
    },
    create: (data) => {
      const newProduct = {
        _id: Date.now().toString(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      products.push(newProduct);
      return Promise.resolve(newProduct);
    },
    findByIdAndUpdate: (id, update) => {
      const index = products.findIndex(p => p._id === id || p._id.toString() === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...update, updatedAt: new Date() };
        return Promise.resolve(products[index]);
      }
      return Promise.resolve(null);
    }
  },
  orders: {
    find: function() {
      return createQuery(orders);
    },
    create: (data) => {
      const newOrder = {
        _id: Date.now().toString(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      orders.push(newOrder);
      return Promise.resolve(newOrder);
    }
  }
};
