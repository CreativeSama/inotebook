const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();

// ✅ FIX: use Render's PORT or fallback to 5000
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Test route
app.get('/', (req, res) => {
  res.send('iNotebook Backend Running');
});

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`);
});
