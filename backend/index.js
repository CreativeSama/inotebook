const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Test route (optional but helpful)
app.get('/', (req, res) => {
  res.send('iNotebook Backend Running');
});

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
