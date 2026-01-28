// Тест загрузки данных
const http = require('http');

const data = JSON.stringify({});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/problems/seed',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    try {
      const jsonData = JSON.parse(responseData);
      console.log('Response:', jsonData);
    } catch (e) {
      console.log('Response (raw):', responseData);
    }
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
});

req.write(data);
req.end();
