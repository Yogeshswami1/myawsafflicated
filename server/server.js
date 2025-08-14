const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// const productRoutes = require('./routes/products');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const affiliateRoutes = require('./routes/affiliateRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
// const authRoutes = require('./routes/authRoutes');
// Load environment variables
dotenv.config();

const app = express();

// Middleware

// app.use(cors({ 
//   origin: ['http://localhost:5173', 'http://localhost:4000'], // Allow both origins
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
// }));app.use(express.json());

app.use(cors({
  origin: 'http://dealfinder.yogeshtech.xyz',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

app.options('*', cors()); // Preflight handle


app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads folder
app.use('/uploads', express.static('uploads'));
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('DealFinder Backend API');
});

// Routes (will add later)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/affiliate-link', affiliateRoutes);
app.use('/api/analytics', analyticsRoutes);
// Start server

// app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});