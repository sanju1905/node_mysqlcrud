const db = require('../config/db');

// Get All Schools API
exports.getAllSchools = async (req, res) => {
    try {
        // Fetch all schools from the database
        const data = await db.query('SELECT * FROM schools');
        
        // Check if no data exists
        if (data.rowCount === 0) {
            return res.status(404).json({ 
                message: "No data found", 
                success: false 
            });
        }

        return res.status(200).json({
            message: "Data fetched successfully",
            success: true,
            data: data[0] // Access rows containing the fetched data
        });
    } catch (error) {
        console.error("Error fetching schools:", error); // Improved error message
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Add School API
exports.addSchool = async (req, res) => {
    try {
        // Destructure fields from request body
        const { name, address, latitude, longitude } = req.body;

        // Validate required fields
        if (!name || !address || !latitude || !longitude) {
            return res.status(400).json({
                message: "Missing fields: name, address, latitude, and longitude are required",
                success: false,
            });
        }

        // Insert the new school into the database
        const [result] = await db.query(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );

        // Send the response with the inserted data
        return res.status(201).json({
            message: "School added successfully",
            data: {
                id: result.insertId, // Fetch the inserted ID
                name,
                address,
                latitude,
                longitude,
            },
            success: true,
        });
    } catch (error) {
        console.error("Error adding school:", error); // Improved error message
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};
