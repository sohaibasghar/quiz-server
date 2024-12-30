const app = require('./app');

// Set the port for local development
const port = process.env.PORT || 3000;

// Start the server locally
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});