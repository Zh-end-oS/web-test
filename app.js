const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();


app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.options('*', cors());

// Обслуживание статических файлов из папки build
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/tickers', async (req, res) => {
  try {
    const response = await axios.get('https://futures-api.poloniex.com/api/v2/tickers');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Poloniex API' });
  }
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


