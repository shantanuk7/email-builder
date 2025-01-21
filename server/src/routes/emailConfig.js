const express = require('express');
const fs = require('fs');

const router = express.Router();

// Handle email configuration submission
router.post('/uploadEmailConfig', (req, res) => {
    const { title, content, imageUrl } = req.body;

    const emailConfig = {
        title: title || '',
        content: content || '',
        imageUrl: imageUrl || '',
    };

    try {
        fs.writeFileSync('emailConfig.json', JSON.stringify(emailConfig, null, 2), 'utf8');
        res.json({ message: 'Email config saved successfully!' });
    } catch (error) {
        console.error('Error saving email config:', error);
        res.status(500).json({ message: 'Failed to save email config' });
    }
});

module.exports = router;
