import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Getting templates..");
    
    axios.get('http://localhost:3000/api/templates/getTemplates')
      .then(res => setTemplates(res.data))
      .then(console.log(templates)
      )
      .catch(err => console.error(err));
  }, []);

  const handleTemplateSelect = (template) => {
    navigate('/editor', { state: { template } });
  };

  return (
    <div>
      <h1>Choose a Template</h1>
      {templates.map(template => (
        <div key={template.id} onClick={() => handleTemplateSelect(template)}>
          <h2>{template.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default TemplatesPage;

