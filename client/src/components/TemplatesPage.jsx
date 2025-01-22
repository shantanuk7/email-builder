import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './templates-page.css';
import { useNavigate } from 'react-router-dom';

const generateHTMLContent = (data, selectedFontFamily = "Arial") => {
  const fontCDNs = {
    Arial: '',
    Georgia: '',
    Helvetica: '',
    "Times New Roman": '',
    Verdana: '',
    Roboto: `<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">`,
    'Open Sans': `<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">`,
  };

  const selectedFontCDN = fontCDNs[selectedFontFamily] || fontCDNs["Arial"];
  const bodyStyle = `
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  `;

  return `
    <html>
      <head>
        ${selectedFontCDN}
        ${bodyStyle}
      </head>
      <body>
        ${data.rows
          .map(
            (row) =>
              `<div>${row.blocks
                .map((block) =>
                  block.type === "image"
                    ? `<div style="text-align: ${block.style?.textAlign || "left"};">
                         <img src="${block.rawContent}" style="${generateStyle(block.style)}" />
                       </div>`
                    : `<div style="${generateStyle(block.style)}">${block.rawContent}</div>`
                )
                .join("")}</div>`
          )
          .join("")}
      </body>
    </html>
  `;
};

const generateStyle = (style) => {
  return Object.entries(style || {})
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ');
};

function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Getting templates..");
    
    axios.get('http://localhost:3000/api/templates/getTemplates')
      .then(res => setTemplates(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleTemplateSelect = (template) => {
    navigate('/editor', { state: { template } });
  };

  return (
    <div className='container'>
      <header>
        <h1>Choose a Template</h1>
      </header>
      <div className='templates'>
        {templates.map((template) => {
          const htmlContent = generateHTMLContent(template); // Assuming `template.data` contains the necessary data
          return (
            <div key={template.id} className="template-card" onClick={() => handleTemplateSelect(template)}>
              <div className="template-card-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
              <h2>{template.name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TemplatesPage;
