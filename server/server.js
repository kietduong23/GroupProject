const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 8000;

const DB_URL = "mongodb://127.0.0.1:27017/lazada";

const { authRoute } = require("./routes/auth");
const { productRoute } = require("./routes/product");
const { customerRoute } = require("./routes/customer");
const { orderRoute } = require("./routes/order");

const  DBConnect = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Error connecting to MongoDB: ", err)
    }
}

DBConnect();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/customers", customerRoute);
app.use("/orders", orderRoute);

app.get("/", (req, res) => {
    res.json({ msg: "Welcome to the Home page" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

