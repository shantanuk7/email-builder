import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './editor-styles.css';
import EditorPane from './EditorPane';

function Editor() {
  const location = useLocation();
  const template = location.state?.template;

  const [data, setData] = useState(template);
  const [selectedBlockTitle, setTitle] = useState(null);
  const [selectedBlockId, setId] = useState(null);
  const [selectedBlockData, setSelectedBlock] = useState(null);

  if (!template) {
    return <div>Error: No template selected.</div>;
  }

  const handleBlockClick = (blockId) => {
    const selectedBlock = data.rows
      .flatMap((row) => row.blocks)
      .find((block) => block.id === blockId);

    if (selectedBlock) {
      setData((prev) => ({ ...prev, activeBlockId: blockId }));
      setTitle(selectedBlock.title);
      setId(selectedBlock.id);
      setSelectedBlock(selectedBlock);
    }
  };

  const handleDownload = () => {
    const htmlContent = generateHTMLContent(data);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'email-template.html';
    link.click();
  };

  const handleBlockChange = (blockId, newContent) => {
    setData((prev) => ({
      ...prev,
      rows: prev.rows.map((row) => ({
        ...row,
        blocks: row.blocks.map((block) =>
          block.id === blockId
            ? { ...block, rawContent: newContent }
            : block
        ),
      })),
    }));
  };
  

  const camelToKebab = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  const generateHTMLContent = (data) => {
    const camelToKebab = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
      </head>
      <body style="margin:0; padding:0">
        ${data.rows
          .map((row) =>
            `<div class="row">
              ${row.blocks
                .map((block) =>
                  block.type === 'text'
                    ? `<p style="${
                        block.style
                          ? Object.entries(block.style)
                              .map(([key, value]) => {
                                const kebabKey = camelToKebab(key);
                                const formattedValue =
                                  typeof value === 'number' ? `${value}px` : value;
                                return `${kebabKey}: ${formattedValue}`;
                              })
                              .join('; ')
                          : ''
                      }">${block.rawContent || ' '}</p>`
                    : `<img src="${block.rawContent}" style="${
                        block.style
                          ? Object.entries(block.style)
                              .map(([key, value]) => {
                                const kebabKey = camelToKebab(key);
                                const formattedValue =
                                  typeof value === 'number' ? `${value}px` : value;
                                return `${kebabKey}: ${formattedValue}`;
                              })
                              .join('; ')
                          : ''
                      }" />`
                )
                .join('')}
            </div>`
          )
          .join('')}
      </body>
      </html>`;
  };
  
  
  
  

  return (
    <div className="container">
      <div className="editor-pane">
        {data.rows.map((row) => (
          <div key={row.id} className="row">
            {row.blocks.map((block) => (
              <div
                key={block.id}
                className={`block ${data.activeBlockId === block.id ? 'active' : ''}`}
                onClick={() => handleBlockClick(block.id)}
              >
                {block.type === 'text' ? (
                    <div
                        className="block-content"
                        style={{
                            fontSize: block.style?.fontSize ? `${block.style.fontSize}px` : '16px',
                            color: block.style?.color || 'black',
                            backgroundColor: block.style?.backgroundColor || 'white',
                        }}
                        >
                        <input
                            type="text"
                            name="text"
                            id={block.id}
                            value={block.rawContent}
                            onChange={(e) => handleBlockChange(block.id, e.target.value)}
                            style={{
                            fontSize: block.style?.fontSize ? `${block.style.fontSize}px` : '16px',
                            color: block.style?.color || 'black',
                            backgroundColor: block.style?.backgroundColor || 'white',
                            padding:block.style?.padding || '0px',
                            margin:block.style?.margin || '0px',
                            fontFamily:block.style?.fontFamily || 'Arial',
                            border: 'none', // Optional: To make it blend into the design
                            outline: 'none', // Optional: To remove focus outline
                            width: '100%', // Optional: Full width of the block
                            }}
                        />
                        </div>


                
                ) : (
                  <img src={block.rawContent} alt="Block" className="block-img" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="editor-controls">
        <div>
            <h3>{selectedBlockTitle === null ? 'Editor Pane' : selectedBlockTitle}</h3>
            <EditorPane
              data={data}
              setData={setData}
              selectedBlockData={selectedBlockData}
              setSelectedBlock={setSelectedBlock}
            />
        </div>
        <button onClick={handleDownload} className="download-btn">
          Download Template
        </button>
      </div>
    </div>
  );
}

export default Editor;
