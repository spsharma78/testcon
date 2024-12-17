const express = require('express'); // Add this line
const app = express();
const { v4 } = require('uuid');
const mysql = require('mysql');
const port = 3000;

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "bsnrlsmgsu6shylbjaae-mysql.services.clever-cloud.com",
  user: "ufvay9lvcba4ekar",
  password: "YjJmjh43BvcOFqRcjO5L",
  database: "bsnrlsmgsu6shylbjaae"
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// API endpoint to get host information
app.get('/get-host-info', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.status(500).send('Error connecting to the database');
      return;
    }

    connection.query('SELECT @@hostname AS host', (err, results) => {
      connection.release(); // Ensure connection is always released
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data');
        return;
      }

      res.json(results);
    });
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

module.exports = app;
