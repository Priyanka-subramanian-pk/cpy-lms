// server.js
const express = require("express");
const app = express();
const sequelize = require("./src/db");
const cors=require('cors')
const port = 5000;
const authAdmin = require('./src/Routes/adminRoutes');

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello all");
});

const startServer = async () => {
  await sequelize.authenticate();
  console.log("connection established");
  await sequelize.sync({ force: true });
  console.log("All models were synchronized successfully");

  // Create admin user on server start
  const { createAdmin } = require('./src/Controller/adminController');
  await createAdmin('vyshnavnarayan35@gmail.com', 'admin@123')

  // Mount the routes
  app.use('/api', authAdmin);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
