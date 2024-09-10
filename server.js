const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/money-tracking", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Connection Error: ", err));

// Schema
const recordSchema = new mongoose.Schema({
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    info: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Record = mongoose.model('Record', recordSchema);

// POST endpoint
app.post("/add", (req, res) => {
    const { category, amount, info, date } = req.body;

    if (!category || !amount || !info) {
        return res.status(400).send('Missing required fields');
    }

    const newRecord = new Record({
        category,
        amount,
        info,
        date: date || new Date()
    });

    newRecord.save((err) => {
        if (err) {
            console.error("Error inserting record: ", err);
            return res.status(500).send('Error inserting record');
        }
        console.log("Record inserted successfully");
        return res.status(201).send('Record inserted successfully');
    });
});

// Serve static index.html file
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*",
    });
    return res.redirect("index.html");
});

// Global error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
