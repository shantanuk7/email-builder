const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const templates = [
    {
      id: "template-1",
      name: "Simple Template",
      rows: [
        {
          id: "row-1",
          blocks: [
            {
              id: 'block1',
              type: 'text',
              title:'Heading',
              htmlContent: '<p>Your text here</p>',
              rawContent: 'Your text here', // Stores raw Draft.js content
              style: { fontSize: '16px', color: '#000' },
            }
            
          ]
        }
      ]
    }
  ];
  
  router.get('/getTemplates', (req, res) => {
    res.json(templates);
  });
  
// Render and download the final template
router.get('/renderAndDownloadTemplate', (req, res) => {
    try {
        const layout = fs.readFileSync(path.join(__dirname, '../views/layout.html'), 'utf8');
        const emailConfig = JSON.parse(fs.readFileSync('emailConfig.json', 'utf8'));

        const rendered = layout
            .replace('{{title}}', emailConfig.title)
            .replace('{{content}}', emailConfig.content)
            .replace('{{imageUrl}}', emailConfig.imageUrl);

        res.setHeader('Content-Disposition', 'attachment; filename="template.html"');
        res.send(rendered);
    } catch (error) {
        console.error('Error rendering template:', error);
        res.status(500).json({ message: 'Failed to render template' });
    }
});

module.exports = router;
