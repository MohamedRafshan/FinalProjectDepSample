// const express = require('express');
// const chatRoutes = require('./chatbot/server');
// const app = express();


// app.get('/', (req, res) => {
//   res.send('Hello World service 2');
// });

// app.use('/chat', chatRoutes);

// const port = process.env.PORT || 8080;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const chatRoutes = require('./chatbot/server');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World service 2');
});

// Chat route
app.use('/chat', chatRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
