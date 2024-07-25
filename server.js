const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());

app.options('*', cors());

app.get('/api/tickers', async (req, res) => {
  try {
    const response = await axios.get('https://futures-api.poloniex.com/api/v2/tickers');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Poloniex API' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});