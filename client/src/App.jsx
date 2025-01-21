import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Editor from './components/Editor';
import TemplatesPage from './components/TemplatesPage';
import './App.css'

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const setTemplateForEditor = async (template)=>{
    // console.log(template);
    await setSelectedTemplate(template);
    if (selectedTemplate != null) {
      console.log(selectedTemplate);
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TemplatesPage onTemplateSelect={ setTemplateForEditor} />} />
        <Route path="/editor" element={<Editor template={selectedTemplate} />} />
      </Routes>
    </Router>
  );
}

export default App;