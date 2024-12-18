const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const config = require('./config/config');
const { connectDB } = require('./config/config');

dotenv.config();

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const testRoute = require('./routes/testRoute');

const app = express();
const PORT = config.port || 5000;

// Connect to MongoDB
connectDB();


app.get('/', (req, res) => {
  res.send('API is running...');
});
// Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || config.allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());
app.use(morgan('combined'));  // Logging HTTP requests

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/test', testRoute);

// File Upload Configuration
const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({ filePath: path.join(__dirname, 'uploads', req.file.filename) });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
