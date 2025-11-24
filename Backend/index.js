import express from "express";
import dotenv from "dotenv";

dotenv.config({
    path: "./env"
});

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Hello from server");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
