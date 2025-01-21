const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routers
const templatesRouter = require('./routes/templates');
const imagesRouter = require('./routes/images');
const emailConfigRouter = require('./routes/emailConfig');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route middlewares
app.use('/api/templates', templatesRouter);
app.use('/api/images', imagesRouter);
app.use('/api/emailConfig', emailConfigRouter);

// Serve the email layout
app.get('/getEmailLayout', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'layout.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
