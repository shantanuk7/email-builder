import React from 'react';
import './editor-pane-styles.css';

const fontFamilies = [
    'Arial, sans-serif',
    'Times New Roman, serif',
    'Courier New, monospace',
    'Georgia, serif',
    `Verdana, 'sans-serif'`,
    `Tahoma, 'sans-serif'`,
    `Trebuchet MS, sans-serif`,
    `Brush Script MT, cursive`
  ];
  
  export default function EditorPane ({ data, setData, selectedBlockData, setSelectedBlock }) {
    if (!selectedBlockData) {
      return <div className="editor-pane-placeholder">Select a block to edit its styles.</div>;
    }
  
    const handleStyleChange = (key, value) => {
      setData((prev) => ({
        ...prev,
        rows: prev.rows.map((row) => ({
          ...row,
          blocks: row.blocks.map((block) =>
            block.id === selectedBlockData.id
              ? {
                  ...block,
                  style: {
                    ...block.style,
                    [key]: value,
                  },
                }
              : block
          ),
        })),
      }));
  
      // Update the selected block data for immediate feedback in the pane
      setSelectedBlock((prev) => ({
        ...prev,
        style: {
          ...prev.style,
          [key]: value,
        },
      }));
    };
  
    return (
      <div className="editor-pane-content">
        <h3>Edit Styles: {selectedBlockData.title}</h3>
  
        {/* Font Size */}
        <div className="editor-field">
          <label htmlFor="font-size">Font Size (px):</label>
          <input
            type="number"
            id="font-size"
            value={selectedBlockData.style?.fontSize || 16}
            onChange={(e) => handleStyleChange('fontSize', parseInt(e.target.value, 10))}
          />
        </div>
  
        {/* Font Family */}
        <div className="editor-field">
          <label htmlFor="font-family">Font Family:</label>
          <select
            id="font-family"
            value={selectedBlockData.style?.fontFamily || fontFamilies[0]}
            onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
          >
            {fontFamilies.map((font) => (
              <option key={font} value={font}>
                {font.split(',')[0]}
              </option>
            ))}
          </select>
        </div>
  
        {/* Text Color */}
        <div className="editor-field">
          <label htmlFor="color">Text Color:</label>
          <input
            type="color"
            id="color"
            value={selectedBlockData.style?.color || '#000000'}
            onChange={(e) => handleStyleChange('color', e.target.value)}
          />
        </div>
  
        {/* Background Color */}
        <div className="editor-field">
          <label htmlFor="background-color">Background Color:</label>
          <input
            type="color"
            id="background-color"
            value={selectedBlockData.style?.backgroundColor || '#ffffff'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
          />
        </div>
  
        {/* Padding */}
        <div className="editor-field">
          <label htmlFor="padding">Padding (px):</label>
          <input
            type="number"
            id="padding"
            value={selectedBlockData.style?.padding || 0}
            onChange={(e) => handleStyleChange('padding', parseInt(e.target.value, 10))}
          />
        </div>
  
        {/* Margin */}
        <div className="editor-field">
          <label htmlFor="margin">Margin (px):</label>
          <input
            type="number"
            id="margin"
            value={selectedBlockData.style?.margin || 0}
            onChange={(e) => handleStyleChange('margin', parseInt(e.target.value, 10))}
          />
        </div>
      </div>
    );
  };
  