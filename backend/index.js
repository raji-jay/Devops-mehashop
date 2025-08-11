const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/megashop';
const port = process.env.PORT || 5000;

let db;
MongoClient.connect(mongoUri)
  .then(client => {
    db = client.db();
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Mongo connect error', err));

app.get('/api/products', async (req, res) => {
  try {
    const products = await db.collection('products').find().toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch products' });
  }
});

// simple seed route (not for production)
app.post('/api/seed', async (req, res) => {
  try {
    const sample = [
      { name: 'Reusable Bottle', price: 12.99 },
      { name: 'Bamboo Toothbrush', price: 3.49 },
      { name: 'Eco Tote Bag', price: 8.99 }
    ];
    await db.collection('products').deleteMany({});
    await db.collection('products').insertMany(sample);
    res.json({ seeded: true });
  } catch (err) {
    res.status(500).json({ error: 'seed failed' });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on ${port}`);
});
