require('dotenv').config();
require('express-async-errors');

const cors = require('cors');
const express = require('express');
const app = express();

const connectDB = require('./db/connect');

const allRoutes = require('./routes/index');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const corsOptions = {
  origin: ['http://192.168.196.82:3000','http://localhost:3000', 'http://127.0.0.1:3000', process.env.CLIENT_ADDRESS],
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
};

app.use(express.static('public'));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/v1/cs/', allRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
