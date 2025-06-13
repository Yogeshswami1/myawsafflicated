// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const upload = require('../middleware/upload');
// const Product = require('../models/Product');
// const { Parser } = require('json2csv');

// // Get all products
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     console.error('Error in GET /api/products:', err.message);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Get a single product by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });
//     res.json(product);
//   } catch (err) {
//     console.error('Error in GET /api/products/:id:', err.message);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Add product
// router.post('/', auth, upload.single('image'), async (req, res) => {
//   const { name, category, brand, price, affiliateLinks, tags, specs, features, inStock, dealScore } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : '';

//   try {
//     const product = new Product({
//       name,
//       category,
//       brand,
//       price,
//       image,
//       affiliateLinks: JSON.parse(affiliateLinks),
//       tags: JSON.parse(tags),
//       specs: JSON.parse(specs),
//       features: JSON.parse(features),
//       inStock,
//       dealScore,
//     });

//     await product.save();
//     res.json(product);
//   } catch (err) {
//     console.error('Error in POST /api/products:', err.message);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Update product
// router.put('/:id', auth, upload.single('image'), async (req, res) => {
//   const { name, category, brand, price, affiliateLinks, tags, specs, features, inStock, dealScore } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : undefined;

//   try {
//     const updateData = {
//       name,
//       category,
//       brand,
//       price,
//       affiliateLinks: JSON.parse(affiliateLinks),
//       tags: JSON.parse(tags),
//       specs: JSON.parse(specs),
//       features: JSON.parse(features),
//       inStock,
//       dealScore,
//     };
//     if (image) updateData.image = image;

//     const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     res.json(product);
//   } catch (err) {
//     console.error('Error in PUT /api/products/:id:', err.message);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Delete product
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     res.json({ message: 'Product deleted' });
//   } catch (err) {
//     console.error('Error in DELETE /api/products/:id:', err.message);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Track affiliate link click
// router.post('/track-click/:id', async (req, res) => {
//   const { linkIndex } = req.body;

//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     product.affiliateLinks[linkIndex].clicks += 1;
//     await product.save();

//     res.json({ message: 'Click tracked' });
//   } catch (err) {
//     console.error('Error in POST /api/products/track-click/:id:', err.message);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Bulk upload via CSV (placeholder)
// router.post('/bulk-upload', auth, async (req, res) => {
//   // Implement CSV parsing logic here
//   res.json({ message: 'Bulk upload placeholder' });
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');
// const multer = require('multer');
// const path = require('path');

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Save files in uploads/ folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     if (extname && mimetype) {
//       return cb(null, true);
//     } else {
//       cb('Error: Images only (jpeg, jpg, png)!');
//     }
//   },
// });

// // GET all products
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (err) {
//     console.error('Error in GET /api/products:', err.message);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // GET single product by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.status(200).json(product);
//   } catch (err) {
//     console.error('Error in GET /api/products/:id:', err.message);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // POST a new product
// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     const {
//       name,
//       category,
//       brand,
//       price,
//       inStock,
//       dealScore,
//       rating,
//       affiliateLinks,
//     } = req.body;

//     // Validate required fields
//     if (!name || !category || !brand || !price) {
//       return res.status(400).json({ message: 'Please fill in all required fields' });
//     }

//     // Parse affiliate links if provided
//     let parsedAffiliateLinks = [];
//     if (affiliateLinks) {
//       parsedAffiliateLinks = JSON.parse(affiliateLinks);
//     }

//     // Create new product
//     const newProduct = new Product({
//       name,
//       category,
//       brand,
//       price: parseFloat(price),
//       image: req.file ? `/uploads/${req.file.filename}` : null,
//       inStock: inStock === 'true',
//       dealScore: dealScore ? parseFloat(dealScore) : 0,
//       rating: rating ? parseFloat(rating) : 0,
//       affiliateLinks: parsedAffiliateLinks,
//     });

//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (err) {
//     console.error('Error in POST /api/products:', err.message);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const csv = require('csv-parse');
const fs = require('fs');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|csv/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images or CSV only (jpeg, jpg, png, csv)!');
    }
  },
});

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error('Error in GET /api/products:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Increment clicks on product view
    product.clicks += 1;
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    console.error('Error in GET /api/products/:id:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST a new product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      category,
      brand,
      price,
      inStock,
      dealScore,
      rating,
      affiliateLinks,
      tags,
    } = req.body;

    if (!name || !category || !brand || !price) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    let parsedAffiliateLinks = [];
    if (affiliateLinks) {
      parsedAffiliateLinks = JSON.parse(affiliateLinks);
    }

    let parsedTags = [];
    if (tags) {
      parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags);
    }

    const newProduct = new Product({
      name,
      category,
      brand,
      price: parseFloat(price),
      image: req.file ? `/uploads/${req.file.filename}` : null,
      inStock: inStock === 'true',
      dealScore: dealScore ? parseFloat(dealScore) : 0,
      rating: rating ? parseFloat(rating) : 0,
      affiliateLinks: parsedAffiliateLinks,
      tags: parsedTags,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error in POST /api/products:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT (Edit) a product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      category,
      brand,
      price,
      inStock,
      dealScore,
      rating,
      affiliateLinks,
      tags,
    } = req.body;

    let parsedAffiliateLinks = [];
    if (affiliateLinks) {
      parsedAffiliateLinks = JSON.parse(affiliateLinks);
    }

    let parsedTags = [];
    if (tags) {
      parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags);
    }

    const updateData = {
      name,
      category,
      brand,
      price: parseFloat(price),
      inStock: inStock === 'true',
      dealScore: dealScore ? parseFloat(dealScore) : 0,
      rating: rating ? parseFloat(rating) : 0,
      affiliateLinks: parsedAffiliateLinks,
      tags: parsedTags,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error('Error in PUT /api/products/:id:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error in DELETE /api/products/:id:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Track affiliate link click
router.post('/:id/affiliate-click/:linkIndex', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const linkIndex = parseInt(req.params.linkIndex);
    if (linkIndex >= product.affiliateLinks.length) {
      return res.status(400).json({ message: 'Invalid affiliate link index' });
    }

    product.affiliateLinks[linkIndex].clicks += 1;
    await product.save();
    res.status(200).json({ message: 'Click tracked', link: product.affiliateLinks[linkIndex] });
  } catch (err) {
    console.error('Error in POST /api/products/:id/affiliate-click/:linkIndex:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Track conversion
router.post('/:id/conversion', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.conversions += 1;
    await product.save();
    res.status(200).json({ message: 'Conversion tracked', conversions: product.conversions });
  } catch (err) {
    console.error('Error in POST /api/products/:id/conversion:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Bulk upload via CSV
router.post('/bulk-upload', upload.single('csv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No CSV file uploaded' });
    }

    const products = [];
    fs.createReadStream(req.file.path)
      .pipe(csv.parse({ columns: true }))
      .on('data', (row) => {
        const product = {
          name: row.name,
          category: row.category,
          brand: row.brand,
          price: parseFloat(row.price),
          inStock: row.inStock === 'true',
          dealScore: parseFloat(row.dealScore) || 0,
          rating: parseFloat(row.rating) || 0,
          affiliateLinks: row.affiliateLinks ? JSON.parse(row.affiliateLinks) : [],
          tags: row.tags ? row.tags.split(',').map(tag => tag.trim()) : [],
        };
        products.push(product);
      })
      .on('end', async () => {
        try {
          await Product.insertMany(products);
          fs.unlinkSync(req.file.path); // Delete the uploaded CSV file
          res.status(201).json({ message: 'Products uploaded successfully', count: products.length });
        } catch (err) {
          console.error('Error in bulk upload:', err.message);
          res.status(500).json({ message: 'Server error', error: err.message });
        }
      })
      .on('error', (err) => {
        console.error('Error parsing CSV:', err.message);
        res.status(500).json({ message: 'Error parsing CSV', error: err.message });
      });
  } catch (err) {
    console.error('Error in POST /api/products/bulk-upload:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;