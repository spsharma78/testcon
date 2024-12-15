// app.js
//SELECT @@hostname AS host

const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

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
      res.status(500).send('Error connecting to the database');
      return;
    }

    connection.query('SELECT @@hostname AS host', (err, results) => {
      if (err) {
        res.status(500).send('Error fetching data');
        return;
      }

      connection.release();
      res.json(results);
    });
  });
});

// Start the server
//app.listen(port, () => {
  //console.log(`Server is running at http://localhost:${port}`);
//});
