const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/UsersRoutes");
const orderRoutes = require("./Routes/OrdersRoutes");
const productRoutes = require('./Routes/ProductRoutes');
const categoryRoutes = require('./Routes/CategoriesRoutes');
const reviewRoutes = require('./Routes/ReviewRoutes');


dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reviews',reviewRoutes);

app.get("/", (req, res) => {
  res.send("api running yay");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`====================================`);
  console.log(`Server running on port ${PORT}`);
  console.log(`====================================`);
});
