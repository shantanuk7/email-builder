import React, { useState, useEffect } from 'react';
import './editor-pane-styles.css';

export default function EditorPane({ data, setData, selectedBlockData, setSelectedBlock }) {
//   const [content, setContent] = useState(selectedBlockData?.rawContent || '');
  const [fontSize, setFontSize] = useState(selectedBlockData?.style?.fontSize || '16px');
  const [fontColor, setFontColor] = useState(selectedBlockData?.style?.color || '#000');
  const [bgColor, setBgColor] = useState(selectedBlockData?.style?.backgroundColor || 'transparent');

  useEffect(() => {
    if (selectedBlockData) {
    //   setContent(selectedBlockData.rawContent);
      setFontSize(selectedBlockData.style?.fontSize || '16px');
      setFontColor(selectedBlockData.style?.color || '#000');
      setBgColor(selectedBlockData.style?.backgroundColor || 'transparent');
    }
  }, [selectedBlockData]);

//   const handleContentChange = (newContent) => {
//     setContent(newContent);
//     setData((prev) => ({
//       ...prev,
//       rows: prev.rows.map((row) => ({
//         ...row,
//         blocks: row.blocks.map((block) =>
//           block.id === selectedBlockData.id
//             ? { ...block, rawContent: newContent }
//             : block
//         ),
//       })),
//     }));
//     setSelectedBlock((prev) => ({
//       ...prev,
//       rawContent: newContent,
//     }));
//   };

  const handleStyleChange = (property, value) => {
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
                  [property]: value,
                },
              }
            : block
        ),
      })),
    }));
    setSelectedBlock((prev) => ({
      ...prev,
      style: {
        ...prev.style,
        [property]: value,
      },
    }));
  };

  return (
    <div className="editor-pane-container">
      {selectedBlockData && (
        <div>
          <h2>{selectedBlockData.id}</h2>
          <h3>Type: {selectedBlockData.type}</h3>
          <h3>Font size: {selectedBlockData.style?.fontSize}</h3>
        </div>
      )}

      {/* Editable Text Box */}
      {/* <div
        className="editable-text"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => handleContentChange(e.target.innerText)}
      >
        {content}
      </div> */}

      <div className="style-controls">
        <label>Font Size</label>
        <input
            type="number"
            value={fontSize}
            onChange={(e) => {
                const newSize = `${e.target.value}`; // Add "px" here
                setFontSize(newSize);
                handleStyleChange('fontSize', newSize);
            }}
            />

        <label>Font Color</label>
        <input
          type="color"
          value={fontColor}
          onChange={(e) => {
              handleStyleChange('color', e.target.value);
            setFontColor(e.target.value);
          }}
        />
        <label>Background Color</label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => {
            handleStyleChange('backgroundColor', e.target.value);
            setBgColor(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
