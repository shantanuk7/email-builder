import React, { useState, useEffect } from 'react';

export default function EditorPane({ data, setData, selectedBlockData, setSelectedBlock }) {
  // Keep the local state for text content
  const [content, setContent] = useState(selectedBlockData ? selectedBlockData.rawContent : '');

  // Whenever selectedBlockData changes, update the local state
  useEffect(() => {
    if (selectedBlockData) {
      setContent(selectedBlockData.rawContent);
    }
  }, [selectedBlockData]);

  const handleDataChange = (newData) => {
    if(selectedBlockData){
        setContent(newData);
        setData((prev) => ({
          ...prev,
          rows: prev.rows.map((row) => ({
            ...row,
            blocks: row.blocks.map((block) =>
              block.id === selectedBlockData.id
                ? { ...block, rawContent: newData }
                : block
            ),
          })),
        }));
        // Update selectedBlockData as well
        setSelectedBlock((prev) => ({
          ...prev,
          rawContent: newData,
        }));
    }
  };

  return (
    <div>
      {selectedBlockData && (
        <div>
          <h2>{selectedBlockData.id}</h2>
          <h2>Type: {selectedBlockData.type}</h2>
          <h2>Font size: {selectedBlockData.style?.fontSize}</h2>
        </div>
      )}

      <input
        type="text"
        value={content}
        onChange={(e) => handleDataChange(e.target.value)}
      />
    </div>
  );
}
