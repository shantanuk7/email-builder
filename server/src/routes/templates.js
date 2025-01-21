const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const templates = [
  {
    id: 'template-1',
    name:'Starter template',
    rows: [
      {
        id: 'row-1',
        blocks: [
          {
            id: 'block-1',
            type: 'image',
            title: 'Logo Image',
            rawContent: '',
            style: {
              color: 'black',
              backgroundColor: 'white',
              padding: '10px',
              margin: '5px',
            },
          },
          {
            id: 'block-2',
            type: 'text',
            title: 'Heading',
            rawContent: 'Another Block of Text',
            style: {
              fontSize: 18,
              color: 'blue',
              backgroundColor: 'lightgray',
              padding: '15px',
              margin: '10px',
              fontFamily:'Arial'
            },
          },
          {
            id: 'block-3',
            type: 'text',
            title: 'Paragraph',
            rawContent: 'Write the description here.',
            style: {
              fontSize: 14,
              color: 'blue',
              backgroundColor: 'lightgray',
              padding: '15px',
              margin: '10px',
              fontFamily:'Arial'
            },
          },
        ],
      },
    ],
  },
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
