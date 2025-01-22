const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const templates = [
  {
    id: 'template-1',
    name: 'Starter Template',
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
              textAlign: 'center',
            },
          },
          {
            id: 'block-2',
            type: 'text',
            title: 'Heading',
            rawContent: 'Welcome to Our Service',
            style: {
              fontSize: 22,
              color: 'black',
              backgroundColor: 'lightgray',
              padding: '15px',
              margin: '10px',
              fontFamily: 'Arial',
              textAlign: 'center',
            },
          },
          {
            id: 'block-3',
            type: 'text',
            title: 'Paragraph',
            rawContent: 'We are excited to have you join us. Here, you can explore all the amazing features we offer!',
            style: {
              fontSize: 16,
              color: 'gray',
              backgroundColor: 'lightgray',
              padding: '15px',
              margin: '10px',
              fontFamily: 'Arial',
              textAlign: 'center',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'template-2',
    name: 'Promotional Template',
    rows: [
      {
        id: 'row-1',
        blocks: [
          {
            id: 'block-1',
            type: 'image',
            title: 'Product Image',
            rawContent: '',  // Placeholder product image
            style: {
              padding: '10px',
              margin: '5px',
              textAlign: 'center',
              backgroundColor: 'white',
            },
          },
          {
            id: 'block-2',
            type: 'text',
            title: 'Heading',
            rawContent: 'Special Offer Just for You!',
            style: {
              fontSize: 24,
              color: '#ff6347',
              backgroundColor: '#fff8f0',
              padding: '15px',
              margin: '10px',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              textAlign: 'center',
            },
          },
          {
            id: 'block-3',
            type: 'text',
            title: 'Description',
            rawContent: 'Get 30% off on our latest collection! Limited time only. Don\'t miss out on this amazing deal.',
            style: {
              fontSize: 16,
              color: 'gray',
              backgroundColor: '#fff8f0',
              padding: '15px',
              margin: '10px',
              fontFamily: 'Roboto',
              textAlign: 'center',
            },
          },
          {
            id: 'block-4',
            type: 'text',
            title: 'Call to Action',
            rawContent: '<a href="https://example.com" style="display:inline-block;padding:10px 20px;background-color:#ff6347;color:white;border-radius:5px;text-decoration:none;">Shop Now</a>',
            style: {
              textAlign: 'center',
              padding: '10px',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'template-3',
    name: 'Newsletter Template',
    rows: [
      {
        id: 'row-1',
        blocks: [
          {
            id: 'block-1',
            type: 'image',
            title: 'Newsletter Logo',
            rawContent: '',
            style: {
              color: 'black',
              backgroundColor: '#f0f0f0',
              padding: '20px',
              textAlign: 'center',
              marginBottom: '20px',
            },
          },
          {
            id: 'block-2',
            type: 'text',
            title: 'Heading',
            rawContent: 'The Latest News from Our Company',
            style: {
              fontSize: 26,
              color: '#333',
              backgroundColor: '#f0f0f0',
              padding: '15px',
              margin: '10px',
              fontFamily: 'Georgia',
              fontWeight: 'bold',
              textAlign: 'center',
            },
          },
          {
            id: 'block-3',
            type: 'text',
            title: 'Featured Article',
            rawContent: 'In our featured article this month, we explore the exciting new trends in tech. Stay ahead with our insights!',
            style: {
              fontSize: 18,
              color: 'black',
              backgroundColor: '#fff',
              padding: '20px',
              margin: '10px',
              fontFamily: 'Verdana',
              textAlign: 'left',
            },
          },
          {
            id: 'block-4',
            type: 'text',
            title: 'Secondary Article',
            rawContent: 'Here are some more updates you don\'t want to miss. Check out what’s new in our industry!',
            style: {
              fontSize: 16,
              color: 'gray',
              backgroundColor: '#fff',
              padding: '20px',
              margin: '10px',
              fontFamily: 'Verdana',
              textAlign: 'left',
            },
          },
        ],
      },
    ],
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
