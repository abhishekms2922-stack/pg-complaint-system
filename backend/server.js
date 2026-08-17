const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Temporary in-memory data
let complaints = [
    {
        id: 1,
        residentName: "Rahul",
        roomNumber: "204",
        contact: "9876543210",
        category: "Water",
        description: "Water leakage in bathroom.",
        date: "2026-08-17",
        priority: "High",
        status: "Pending"
    },
    {
        id: 2,
        residentName: "Arjun",
        roomNumber: "105",
        contact: "9876501234",
        category: "Internet",
        description: "Wi-Fi is not working properly.",
        date: "2026-08-16",
        priority: "Medium",
        status: "In Progress"
    }
];

let nextId = 3;

// GET all complaints
app.get("/api/complaints", (req, res) => {
    res.json(complaints);
});

// GET single complaint
app.get("/api/complaints/:id", (req, res) => {
    const id = Number(req.params.id);

    const complaint = complaints.find(c => c.id === id);

    if (!complaint) {
        return res.status(404).json({
            message: "Complaint not found"
        });
    }

    res.json(complaint);
});

// POST new complaint
app.post("/api/complaints", (req, res) => {
    const {
        residentName,
        roomNumber,
        contact,
        category,
        description,
        date,
        priority
    } = req.body;

    if (
        !residentName ||
        !roomNumber ||
        !contact ||
        !category ||
        !description ||
        !date ||
        !priority
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const complaint = {
        id: nextId++,
        residentName,
        roomNumber,
        contact,
        category,
        description,
        date,
        priority,
        status: "Pending"
    };

    complaints.push(complaint);

    res.status(201).json({
        message: "Complaint created successfully",
        complaint
    });
});

// PUT update complaint
app.put("/api/complaints/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = complaints.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Complaint not found"
        });
    }

    complaints[index] = {
        ...complaints[index],
        ...req.body,
        id
    };

    res.json({
        message: "Complaint updated successfully",
        complaint: complaints[index]
    });
});

// DELETE complaint
app.delete("/api/complaints/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = complaints.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Complaint not found"
        });
    }

    complaints.splice(index, 1);

    res.json({
        message: "Complaint deleted successfully"
    });
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});