import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import addressRouter from "./routes/address.route.js";
import orderRouter from "./routes/order.route.js";
import productRouter from "./routes/product.routes.js";
import ctdb from "./utils/db.util.js";

const PORT = 5000;

const app = express();

app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/user", userRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/products", productRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.get("/", (req, res) => {
    res.status(200).send("Welcome to the E-Commerce API");
});

// Start server
ctdb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is live at : http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
});