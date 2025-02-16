const express = require('express');
const axios = require('axios');

const app = express();
const port = 5001; // شماره پورت سرور پروکسی

// مسیر پروکسی که درخواست‌ها به آن ارسال می‌شود
app.get('/proxy', async (req, res) => {
  const { url } = req.query; // URL مقصد را از پارامترهای query دریافت می‌کنیم

  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    // ارسال درخواست به API مقصد
    const response = await axios.get(url);
    res.json(response.data); // ارسال داده‌های دریافتی به کلاینت
  } catch (error) {
    console.error('Error in proxy request:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running at http://localhost:${port}`);
});
